const quantity = () => {
  return Math.floor(Math.random() * 100).toString();
};

const parts = [...new Array(20)].map((part, id) => ({
  id: id + 1,
  part_file: { id: id + 1, file_name: `part-${id + 1}.stl`, units: 'mm' },
  quantity: quantity(),
}));

const manufacturingProcesses = [
  {
    id: '1',
    name: 'DLS',
    materials: [
      { id: '1', name: 'RPU 70' },
      { id: '2', name: 'FPU 50' },
    ],
  },
  {
    id: '2',
    name: 'FDM',
    materials: [{ id: '3', name: 'ABS' }],
  },
  {
    id: '3',
    name: 'CNC',
    materials: [
      { id: '4', name: 'Aluminum' },
      { id: '5', name: 'Steel' },
    ],
  },
];

exports.parts = parts;
exports.manufacturingProcesses = manufacturingProcesses;
