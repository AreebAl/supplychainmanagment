import {
  registerUser,
  loginUser,
  createProcurementManager,
  createInspectionManager,
  assignInspectionManager,
  unassignInspectionManager
} from '../services/authService.js';

// Register a user
export const register = async (req, res) => {
  const { name, email, password, role, phone,createdBy } = req.body;

  try {
    if(req.headers.role ||req.headers.role=='admin'){
    const user = await registerUser({ name, email, password, role, phone,createdBy });
    res.status(201).json(user);
    }else{
      res.status(400).json({
        success:false,
        message:"only admin allowed to create new member"
      })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const user = await loginUser({ email, phone, password });
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Create a procurement manager
export const createProcurementManagerController = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const user = await createProcurementManager({ name, email, password, phone });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create an inspection manager
export const createInspectionManagerController = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const adminId = req.user._id; // Assuming user id is included in request object

  try {
    const user = await createInspectionManager({ name, email, password, phone, adminId });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Assign an inspection manager
export const assignInspectionManagerController = async (req, res) => {
  const { inspectionManagerId, managerId } = req.body;

  try {
    const inspectionManager = await assignInspectionManager(inspectionManagerId, managerId);
    res.json(inspectionManager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Unassign an inspection manager
export const unassignInspectionManagerController = async (req, res) => {
  const { inspectionManagerId } = req.body;

  try {
    const inspectionManager = await unassignInspectionManager(inspectionManagerId);
    res.json(inspectionManager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
