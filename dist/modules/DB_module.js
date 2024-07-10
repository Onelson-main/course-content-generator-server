"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesFromDB = exports.getCourseFromDBByID = exports.getCourseFromDBByName = exports.saveCourseToDB = exports.supabase = exports.supabaseKey = exports.supabaseUrl = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = __importDefault(require("../core/config"));
exports.supabaseUrl = 'https://piwoztkkeuzvbpukllqf.supabase.co';
exports.supabaseKey = config_1.default.SUPABASE_KEY || "";
exports.supabase = (0, supabase_js_1.createClient)(exports.supabaseUrl, exports.supabaseKey);
const saveCourseToDB = async (course) => {
    try {
        let { error } = await exports.supabase.from("courses")
            .insert([
            course
        ]).select();
        console.log(error);
        if (!error) {
            return ({ status: true });
        }
        else {
            return ({ status: false });
        }
    }
    catch (err) {
        console.log(err);
        return ({ status: false });
    }
};
exports.saveCourseToDB = saveCourseToDB;
const getCourseFromDBByName = async (courseName) => {
    try {
        let { data, error } = await exports.supabase
            .from('courses')
            .select()
            .match({ "title": courseName });
        // console.log(error)
        if (!error && ((data === null || data === void 0 ? void 0 : data.length) || 0) > 0) {
            return { status: true, data: data === null || data === void 0 ? void 0 : data[0] };
        }
        else {
            return { status: false, data: {} };
        }
    }
    catch (err) {
        console.log(err);
        return { status: false, data: {} };
    }
};
exports.getCourseFromDBByName = getCourseFromDBByName;
const getCourseFromDBByID = async (id) => {
    try {
        let { data, error } = await exports.supabase
            .from('courses')
            .select()
            .match({ "id": id });
        // console.log(error)
        if (!error) {
            return { status: true, data: data === null || data === void 0 ? void 0 : data[0] };
        }
        else {
            return { status: false, data: {} };
        }
    }
    catch (err) {
        console.log(err);
        return { status: false, data: {} };
    }
};
exports.getCourseFromDBByID = getCourseFromDBByID;
const getCoursesFromDB = async () => {
    try {
        let { data, error } = await exports.supabase
            .from('courses')
            .select("id,title")
            .limit(50)
            .order("title", { ascending: true });
        if (!error) {
            return { status: true, data };
        }
        else {
            return { status: false, data: {} };
        }
    }
    catch (err) {
        console.log(err);
        return { status: false, data: {} };
    }
};
exports.getCoursesFromDB = getCoursesFromDB;
