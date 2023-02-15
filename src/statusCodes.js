const statusCodes = {
  OK: 200,
  CREATED: 201,
  INVALID_FIELDS: 400,
  FIELDS_MISSING: 400,
};

const mapStatus = (type) => statusCodes[type] || 500;

module.exports = {
  statusCodes,
  mapStatus,
};