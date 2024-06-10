import {Checklist} from '../model/checklist.js'
import { uploadImage } from '../UTILITY/cloudinaryconfig.js';
import path from 'path'
const createChecklist = async (checklistData, files) => {
  const checklist = new Checklist(checklistData);

  if (files && files.loading) {
    const loadingImageUrl = await uploadImage(files.loading[0].path);
    console.log(loadingImageUrl)
    checklist.images.loading = loadingImageUrl;
    console.log(loadingImageUrl.secure_url)
    console.log(checklist)
  }

  if (files && files.unloading) {
    const unloadingImageUrl = await uploadImage(files.unloading[0].path);
    checklist.images.unloading = unloadingImageUrl;
  }
  console.log("this is service call");
  return await checklist.save();
};


const getChecklists = async () => {
  return await Checklist.find();
};

const getChecklistById = async (id) => {
  return await Checklist.findById(id);
};

const updateChecklist = async (id, checklistData, files) => {
  const checklist = await Checklist.findById(id);

  if (!checklist) {
    throw new Error('Checklist not found');
  }

  Object.assign(checklist, checklistData);

  if (files.loading) {
    const loadingImageUrl = await uploadImage(files.loading);
    checklist.images.loading = loadingImageUrl;
  }

  if (files.unloading) {
    const unloadingImageUrl = await uploadImage(files.unloading);
    checklist.images.unloading = unloadingImageUrl;
  }

  return await checklist.save();
};

const deleteChecklist = async (id) => {
  return await Checklist.findByIdAndDelete(id);
};

export { createChecklist, getChecklists, getChecklistById, updateChecklist, deleteChecklist };
