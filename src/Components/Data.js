function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const Preparation = [
    { name: 'Family', section: 'Wants & Needs', 'Position': 1 },
    { name: 'BHC', section: 'Create Your Budget', 'Position': 2 },
    { name: 'Personal Bank', section: 'Create Your Budget', 'Position': 2 },
    { name: 'Homebuying Class', section: 'Homebuying Education', 'Position': 3 },
    { name: 'Bank Statements', section: 'Gather Documents', 'Position': 3 },
    { name: 'Credit Report', section: 'Gather Documents', 'Position': 3 },
    { name: 'Tax Returns', section: 'Gather Documents', 'Position': 3 },
    { name: 'Pay Stubs', section: 'Gather Documents', 'Position': 3 }
];

const Exploration = [
    { name: 'Lender', section: 'Talk to a Lender', 'Position': 1 },
    { name: 'Real Estate Agent', section: 'Find a Realtor', 'Position': 1 },
    { name: 'Downpayment Assistance', section: 'Financial Assistance', 'Position': 3 },
    { name: 'Affordable Mortgage', section: 'Financial Assistance', 'Position': 3 },
    { name: 'Closing Cost Grant', section: 'Financial Assistance', 'Position': 3 },
    { name: 'Home Databases', section: 'Begin Your Search', 'Position': 3 },
    { name: 'Loan Officer', section: 'Pre-Approval', 'Position': 2 }
];

const Application = [
    { name: 'Real Estate Agent', section: 'Choose Your Home', 'Position': 1 },
    { name: 'Sellers', section: 'Choose Your Home', 'Position': 2 },
    { name: 'Family', section: 'Choose Your Home', 'Position': 1 },
    { name: 'Purchase Agreement', section: 'Choose Your Home', 'Position': 3 },
    { name: 'Attorney', section: 'Hire An Attorney', 'Position': 2 },
    { name: 'Formal Mortgage Application', section: 'Finalize your Mortgage', 'Position': 3 },
    { name: 'Purchase & Sale Agreement', section: 'Finalize your Mortgage', 'Position': 3 },
    { name: 'Lender', section: 'Finalize your Mortgage', 'Position': 1 }
];

const Finalization = [
    { name: 'Inspector', section: 'Inspection & Appraisal', 'Position': 1 },
    { name: 'Appraiser', section: 'Inspection & Appraisal', 'Position': 1 },
    { name: 'Appraisal Report', section: 'Inspection & Appraisal', 'Position': 1 },
    { name: 'Title Company', section: 'Title Transfer', 'Position': 2 },
    { name: 'Closing Disclosure Document', section: 'Closing Disclosure', 'Position': 3 }
];

shuffleArray(Preparation);
shuffleArray(Exploration);
shuffleArray(Application);
shuffleArray(Finalization);

export { Preparation, Exploration, Application, Finalization };

