import {Request, Response} from 'express'
import db from '../Database/conections';
import converterHourToMinutes from '../itens/converterHourToMinutes';
interface ScheduleItem {
    week_day:number;
    from: string;
    to:string;
}
export default class ClassesController {
    async index(request: Request, response:Response){
        const filters = request.query;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time  as string;
        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error:'Missing Filters to seerch classes'
            })
        }
        const timeMinutes = converterHourToMinutes(time)
        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
            .whereRaw('`class_schedule`.`week_day`= ??', [Number(week_day)])
            .whereRaw('`class_schedule`. `from` <= ??', [timeMinutes])
            .whereRaw('`class_schedule`. `to` > ??', [timeMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);
        return response.json(classes);
    } 
    async create(request :Request, response :Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio, 
            subject,
            cost,
            schedule 
        } = request.body;
        const trx = await db.transaction();
      try {
        const isnertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio, 
        });
        const user_id = isnertedUsersIds[0];
       const insertclassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,
    
        });
        const class_id = insertclassesIds[0];
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day:scheduleItem.week_day,
                from:converterHourToMinutes(scheduleItem.from),
                to:converterHourToMinutes(scheduleItem.to),
            };
        })
        await trx('class_schedule').insert(classSchedule);
        await trx.commit();
        return response.status(201).send();
        }catch(err) {
          await trx.rollback();
            return response.status(400).json({
              error:"unixpeted erro white creating new class"
           })
        }
    }
}