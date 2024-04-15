const leaveReq = [
    {
        requestId: 1,
        title: "Vacation Request",
        type: "Vacation",
        message: "I would like to request a vacation for the upcoming week.",
        userId: 123,
        status: "Pending",
    },
    {
        requestId: 2,
        title: "Sick Leave Request",
        type: "Sick Leave",
        message: "Unfortunately, I am unwell and need to take a sick leave.",
        userId: 456,
        status: "Approved",
    },
    {
        requestId: 3,
        title: "Work From Home Request",
        type: "Work From Home",
        message: "Requesting permission to work from home for a day.",
        userId: 789,
        status: "Pending",
    },
    {
        requestId: 4,
        title: "Maternity Leave Request",
        type: "Maternity Leave",
        message: "I am expecting, and I need to request maternity leave starting next month.",
        userId: 101,
        status: "Rejected",
    },
    {
        requestId: 5,
        title: "Training Leave Request",
        type: "Training",
        message: "I have a training program scheduled and need to take a leave for that period.",
        userId: 202,
        status: "Pending",
    },
];

export default leaveReq;
