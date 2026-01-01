const backendURL = import.meta.env.backendURL;

const usersURL = `${backendURL}/api/users`;
const adminURL = `${backendURL}/api/admin`;
const taskURL = `${backendURL}/api/tasks`;
export { backendURL, usersURL, adminURL, taskURL };
