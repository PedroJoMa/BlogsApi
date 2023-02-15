const statusCodes = {
  OK: 200,
  CREATED: 201,
  INVALID_FIELDS: 400,
  ALREADY_CREATED: 409,
};

const mapStatus = (type) => statusCodes[type] || 500;

module.exports = {
  statusCodes,
  mapStatus,
};