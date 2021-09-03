const queue = { }
  
const getTimeout = (task) => setTimeout(() => task(), 5000)

export const pushTaskRef = (submissionId, task) => {
    if(queue[submissionId]) {
        clearInterval(queue[submissionId])
    }

    queue[submissionId] = getTimeout(task)
}

