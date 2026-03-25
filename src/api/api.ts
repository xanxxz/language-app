import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const updateLanguage = async (language_code: string) => {
  const res = await api.patch("/auth/language", {
    language_code,
  });
  return res.data;
};

export const updateUsername = async (username: string) => {
  const res = await api.patch("/auth/username", { username });
  return res.data;
};

// 📘 LESSONS
export const getLessons = async () => {
  const res = await api.get("/lessons");
  return res.data;
};

// 🧩 STEPS
export const getLessonSteps = async (lessonId: number) => {
  const res = await api.get(`/lessons/${lessonId}/steps`);
  return res.data;
};

// 🔘 OPTIONS
export const getStepOptions = async (stepId: number) => {
  const res = await api.get(`/steps/${stepId}/options`);
  return res.data;
};

// 🧠 CHECK ANSWER
export const checkAnswer = async (stepId: number, answer: string) => {
  const res = await api.post(`/steps/${stepId}/check`, {
    answer,
  });
  return res.data; // { correct: boolean }
};

// 📊 PROGRESS
export const saveProgress = async (
  lesson_id: number,
  progress: number,
  completed: boolean
) => {
  const res = await api.post("/progress", {
    lesson_id,
    progress,
    completed,
  });

  return res.data;
};

export const getProgress = async () => {
  const res = await api.get('/progress');
  return res.data;
};

export const createLesson = async (data: any) => {
  const res = await api.post("/admin/lessons", data);
  return res.data;
};

export const createStep = async (data: any) => {
  const res = await api.post("/admin/steps", data);
  return res.data;
};

export const createOptions = async (data: any) => {
  const res = await api.post("/admin/options", data);
  return res.data;
};

export const createFullLesson = async (data: any) => {
  const res = await api.post('/admin/full-lesson', data);
  return res.data;
};

export const deleteLessonApi = async (id: number) => {
  const res = await api.delete(`/admin/lessons/${id}`);
  return res.data;
};