const d1 = (
    <>
        <p>
            The journey begins by articulating your vision for your new home. The most effective approach is to create a comprehensive list categorizing must-haves, needs, and wants. Must-haves encompass elements that are indispensable to you, such as location, parking spaces, and proximity to public transportation. Needs are similar but represent features you might be open to adding later, such as large kitchen islands or a specific number of bathrooms. Wants are additional aspects that enhance the appeal of a house when comparing different options.
        </p>
        <p>
            This step is incredibly beneficial as it allows you to streamline your house search with your realtor. It also enables you, at a later stage, to compare your choices and factor in any potential renovation costs associated with a particular property.
        </p>
        <p>
            Remember! There are a lot of surprise costs that you may incur in the first year of your new home including any unexpected repairs, general upkeep, insurance costs. It is smart to set aside additional funds for these as well!
        </p>
    </>
)

const d2 = (
    <>
        <p>
            When crafting a budget, remember to think SMART: Specific, Measurable, Attainable, Realistic, and Time-bound! Ensure that your budget accounts for explicit costs, including fixed expenses (such as mortgage, down payment, health care, and credit cards), maintenance costs for your new home (covering home repairs, heating, and electricity), expenses related to the home-buying process (such as payments to realtors and lawyers), as well as discretionary costs like food, clothing, and daily expenditures.
        </p>
        <p>
            When crafting a budget, remember to think SMART: Specific, Measurable, Attainable, Realistic, and Time-bound! Ensure that your budget accounts for explicit costs, including fixed expenses (such as mortgage, down payment, health care, and credit cards), maintenance costs for your new home (covering home repairs, heating, and electricity), expenses related to the home-buying process (such as payments to realtors and lawyers), as well as discretionary costs like food, clothing, and daily expenditures.
        </p>
        <p>
            Something that may be helpful: write these down and begin a folder for all the documents that you will eventually need to gather for buying your home!
        </p>
    </>
)

const d3 = (
    <>
        <p>
            Before you begin the rest of your journey, if you are looking to qualify for any home finance  assistance programs in Boston, you are REQUIRED to take the Boston Home-buying 101 class.
        </p>
        <p>
            This class provides you with critical information that will help you through the home buying process. The link to register is provided in the resources tab!
        </p>
    </>
)

const d4 = (
    <>
        <ol>
            <li><strong>Identity:</strong> your driver’s license, passport, state approved id</li>
            <li><strong>Social Security Card</strong></li>
            <li>
                <strong>Tax returns:</strong> all tax returns and W-2s from the past two years so the lender can verify if household income was consistent
                <ol>
                    <li>If you are self-employed instead of W-2s bring your 1099 forms for the same reason</li>
                </ol>
            </li>
            <li><strong>Pay Stubs</strong> from the past 30 days</li>
            <li>
                <strong>Bank Account statements</strong> from the last 60 days
                <ol>
                    <li>Make sure to bring statements from ALL accounts: checking, savings, investments, and retirement (for investment and retirement quarterly is fine)</li>
                </ol>
            </li>
            <li>
                <strong>Additional documents:</strong> these are based on exigent circumstances
                <ol>
                    <li>Any divorce documents</li>
                    <li>Any debt or bankruptcy related documents</li>
                    <li>Any rental history - The best way to judge this is if it is related to financial history, bring it! It is always better to bring more than less</li>
                </ol>
            </li>
        </ol>
    </>
)

const PreparationContents = [
    {
        "section": "Wants & Needs",
        "description": d1,
        "resources": "None",
        "barriers": "Feeling overwhelmed by down payment value— there are A LOT of down payment assistance programs that exist today. Using the BHC is an awesome resource to explore your options as you move further down the line\nlimited savings"
    },
    {
        "section": "Create Your Budget",
        "description": d2,
        "resources": ["https://www.lowermybills.com/page_assets/static/77a2bfb154e47ddaf0b64ed6f2720612/LMB_WantsVsNeedsVsMustHavesChecklist_Final.pdf"],
        "barriers": "None"
    },
    {
        "section": "Homebuying Education",
        "description": d3,
        "resources" : "None",
        "barriers": "Time commitment: It is a long class but the information will help you clear up a lot of questions you may have and also graduating from this class allows you to qualify for a plethora of financial assistance programs!"
    },
    {
        "section": "Gather Documents",
        "description":
            d4,
        "resources": "None",
        "barriers": "Unable to locate or find documents\n\nExigent circumstances not listed may be overwhelming"
    }
]
export { PreparationContents };