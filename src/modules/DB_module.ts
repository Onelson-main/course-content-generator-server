import { createClient } from '@supabase/supabase-js';
import config from '../core/config';
import { Course_type } from '../core/types';

export const supabaseUrl = 'https://piwoztkkeuzvbpukllqf.supabase.co';
export const supabaseKey = config.SUPABASE_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveCourseToDB = async (course: Course_type) => {
    try {
        let { error } = await supabase.from("courses")
            .insert([
                course
            ]).select();
        console.log(error)
        if (!error) {
            return ({ status: true });
        } else {
            return ({ status: false });
        }
    } catch (err) {
        console.log(err);
        return ({ status: false });

    }
}




export const getCourseFromDBByName = async (courseName: string | number) => {
    try {
        let { data, error } = await supabase
            .from('courses')
            .select()
            .match({ "title": courseName })
        // console.log(error)
        if (!error && (data?.length || 0) > 0) {
            return { status: true, data: data?.[0] };
        } else {
            return { status: false, data: {} };
        }
    } catch (err) {
        console.log(err);
        return { status: false, data: {} };
    }
}




export const getCourseFromDBByID = async (id: number) => {
    try {
        let { data, error } = await supabase
            .from('courses')
            .select()
            .match({ "id": id })
        // console.log(error)
        if (!error) {
            return { status: true, data: data?.[0] };
        } else {
            return { status: false, data: {} };
        }
    } catch (err) {
        console.log(err);
        return { status: false, data: {} };
    }
}



export const getCoursesFromDB = async () => {
    try {
        let { data, error } = await supabase
            .from('courses')
            .select("id,title")
            .limit(50)
            .order("title", { ascending: true })
        if (!error) {
            return { status: true, data };
        } else {
            return { status: false, data: {} };
        }
    } catch (err) {
        console.log(err);
        return { status: false, data: {} };
    }
}
