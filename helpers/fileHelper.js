
export const findByTaskId = (tasks, id) => {
    return tasks.find(task => task.id === Number(id));
}


export const findUserByEmail = (users, email)=>{
    return users.find(user=> user.email == email);
}