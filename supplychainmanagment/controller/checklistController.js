import { createChecklist, getChecklists, getChecklistById, updateChecklist, deleteChecklist } from '../services/checklistService.js';

const createChecklistController = async (req, res) => {
  try {
   
   // console.log(req.files, '-->req files');
    const checklist = await createChecklist(req.body, req.files);
    res.status(201).json({checklist:checklist,createdBy:req.user._id});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChecklistsController = async (req, res) => {
  try {
    const checklists = await getChecklists();
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChecklistByIdController = async (req, res) => {
  try {
    const checklist = await getChecklistById(req.params.id);
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist not found' });
    }
    res.json(checklist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateChecklistController = async (req, res) => {
  try {
    const checklist = await updateChecklist(req.params.id, req.body, req.files);
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist not found' });
    }
    res.json(checklist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteChecklistController = async (req, res) => {
  try {
    const checklist = await deleteChecklist(req.params.id);
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist not found' });
    }
    res.json({ message: 'Checklist deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createChecklistController, getChecklistsController, getChecklistByIdController, updateChecklistController, deleteChecklistController };
