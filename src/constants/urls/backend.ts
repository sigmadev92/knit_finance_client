const backendURL = import.meta.env.VITE_backendURL;

const usersURL = `${backendURL}/api/users`;
const adminURL = `${backendURL}/api/admin`;
const taskURL = `${backendURL}/api/tasks`;
const testingURL = `${backendURL}/api/testing`;
export { backendURL, usersURL, adminURL, taskURL, testingURL };
