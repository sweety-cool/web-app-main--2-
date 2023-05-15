const headers = [
	{
		title: "Home",
		path: "/",
		role: [1, 2],
	},

	{
		title: "POST A JOB",
		path: "/job/post",
		role: [1],
	},

	{
		title: "VIEW JOB",
		path: "/job/listing",
		role: [1, 2],
	},

	{
		title: "MY ACCOUNT",
		path: "/account/profile",
		role: [1, 2],
	},
	{
		title: "INBOX",
		path: "/account/inbox",
		role: [1, 2],
	},
	{
		title: "HOW IT WORK",
		path: "/account/how_it_works",
		role: [1, 2],
	},
];

const EditProfileSideBar = [
	{
		title: "Jobs",
		path: "/account/jobs",
		role: [1, 2],
	},

	
	{
		title: "My Profile",
		path: "/account/profile",
		role: [1, 2],
	},
	{
		title: "Inbox",
		path: "/account/inbox",
		role: [1, 2],
	},
	{
		title: "Edit My Profile",
		path: "/account/edit-profile",
		role: [1, 2],
	},
	{
		title: "Withdraw Funds",
		path: "/account/withdraw",
		role: [2],
	},
	{
		title: "Review Machinists",
		path: "/account/reviews",
		role: [1],
	},
	{
		title: "Invoices",
		path: "/account/invoices",
		role: [2],
	},
{
		title: "Customer Review",
		path: "/account/Customer-Review",
		role: [2],
	},
	{
		title: "Change Password",
		path: "/account/change-password",
		role: [1, 2],
	},
        
];
const jobsTab = [
	{
		title: "All",
		id: 1,
	},

	{
		title: "My Bids",
		id: 2,
	},
	{ title: "My Order in Progress", id: 3 },
	{ title: "My Finalized Order", id: 4 },
];

export default { headers, EditProfileSideBar, jobsTab };
