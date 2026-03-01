const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  const { service, stylist, appointmentDate, notes } = req.body;
  const appointment = await Appointment.create({
    user: req.user._id,
    service,
    stylist,
    appointmentDate,
    notes
  });
  res.status(201).json({ message: 'Appointment booked', appointment });
};

const myAppointments = async (req, res) => {
  const data = await Appointment.find({ user: req.user._id }).sort({ appointmentDate: -1 });
  res.json(data);
};

const allAppointments = async (req, res) => {
  const data = await Appointment.find().populate('user', 'name email').sort({ appointmentDate: -1 });
  res.json(data);
};

const getAppointmentById = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate('user', 'name email');
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

  const isAdmin = req.user?.role === 'admin';
  const isOwner = appointment.user?._id?.toString() === req.user?._id?.toString();
  if (!isAdmin && !isOwner) return res.status(403).json({ message: 'Access denied' });

  return res.json(appointment);
};

const updateStatus = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(appointment);
};

module.exports = { createAppointment, myAppointments, allAppointments, getAppointmentById, updateStatus };
