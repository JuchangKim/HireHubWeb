const mongoose = require('mongoose');
const dotenv = require('dotenv');
const News = require('../models/News');

dotenv.config();

const uri = 'mongodb+srv://brad193026:rla8230643@hirehubweb.pvnmg.mongodb.net/?retryWrites=true&w=majority&appName=HireHubWeb'; 
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define the sample news data to seed
const news = [
  {
    id: 1,
    title: `Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns`,
    description: `A major tech company has just released its latest line of gadgets, promising to revolutionize the market.`,
    content: `By Akash Sriram and Abhirup Roy (Reuters) - A self-driving Tesla (NASDAQ:TSLA) carrying a passenger for Uber (NYSE:UBER) rammed into an SUV at an intersection in suburban Las Vegas in April, an accident that sparked new concerns that a growing stable of self-styled 'robotaxis' is exploiting a regulatory gray area in U.S. cities, putting lives at risk.
    
      Tesla CEO Elon Musk aims to show off plans for a robotaxi, or self-driving car used for ride-hailing services, on Oct. 10, and he has long contemplated a Tesla-run taxi network of autonomous vehicles owned by individuals. Do-it-yourself versions, however, are already proliferating, according to 11 ride-hail drivers who use Tesla's Full Self-Driving (FSD) software. Many say the software, which costs $99 per month, has limitations, but that they use it because it helps reduce drivers' stress and therefore allows them to work longer hours and earn more money.
      
      Reuters is first to report about the Las Vegas accident and a related inquiry by federal safety officials, and of the broad use by ride-hail drivers of Tesla autonomous software. While test versions of self-driving cabs with human backup drivers from robotaxi operators such as Alphabet (NASDAQ:GOOGL)'s Waymo and General Motors (NYSE:GM)'s Cruise are heavily regulated, state and federal authorities say Tesla drivers alone are responsible for their vehicles, whether or not they use driver-assist software. Waymo and Cruise use test versions of software categorized as fully autonomous while Tesla FSD is categorized as a level requiring driver oversight.
      
      The other driver in the April 10 Las Vegas accident, who was taken to the hospital, was faulted for failing to yield the right of way, according to the police report. The Las Vegas Tesla driver, Justin Yoon, said on YouTube the Tesla software failed to slow his vehicle even after the SUV emerged from a blind spot created by another vehicle.
      
      Source: https://www.investing.com/news/stock-market-news/uber-lyft-drivers-use-teslas-as-makeshift-robotaxis-raising-safety-concerns-3650091`,
    datePosted: new Date(`2024-10-05T09:36:24Z`),
    imageUrl: `https://i-invdn-com.investing.com/trkd-images/LYNXMPEK920D1_L.jpg`,
    industry: [
      `IT`,
      `Engineering`
    ],
    companies: [
        { name: `Uber`, url: `https://www.uber.com/nz/en/` },
        { name: `Lyft`, url: `https://www.lyft.com/` },
        { name: `Tesla`, url: `https://www.tesla.com/en_nz` }
    ],
    comments: [
      {
        user: `John Doe`,
        text: `Exciting news! Can't wait to try it.`,
        time: new Date(`2024-10-05T14:30:26Z`)
      },
      {
        user: `Jane Smith`,
        text: `Looks interesting, but I'll wait for reviews.`,
        time: new Date(`2024-10-05T15:00:45Z`)
      },
      {
        user: `Karl Smith`,
        text: `I would like to use as soon as possible.`,
        time: new Date(`2024-10-07T19:09:38Z`)
      }
    ]
  },
  {
    id: 2,
    title: `Pedestrian level crossings removed ahead of City Rail Link opening`,
    description: `Seven pedestrian level crossings in Auckland are to be removed to improve safety ahead of the opening of the City Rail Link (CRL).`,
    content: `Works on the removal of two in South Auckland at Wiri's Homai Train Station on the Southern Line is currently underway, along with five more in other parts of the city. Auckland Transport programme director Kris Gibson said the removal was for operational and safety reasons.
    
      "When CRL goes live, the number of trains that will be run on the network progressively increases," Gibson said.
      
      "More trains means the barrier arms are down longer, which means it has an operational impact on pedestrians and road users and also increases the safety risk with people."
      
      The concrete stair access from the Browns Rd overbridge will also be removed, but it will be replaced by a ramp, and it will be the only access to Homai in the future.
      
      "Bearing in mind the community this train station serves, in particular the blind and low vision, the use of steps isn't acceptable. So we will remove those concrete steps and replace them with a ramp from Browns Rd bridge to the station. We've spent a lot of time with the BLENZZ to design this ramp that suits their particular needs."
      
      Gibson said the materials used for the ramp, including the color palette specifically chosen for the design, would help people with low vision articulate depth perception.
      
      "A normal uniform ramp, for low vision users, it's difficult for them to tell or sort of calculate the gradient in their mind. But we've designed a structure that the color palette changes assist with that depth perception."
      
      Source: https://www.1news.co.nz/2024/10/03/pedestrian-level-crossings-removed-ahead-of-city-rail-link-opening/`,
    datePosted: new Date(`2024-10-03T15:24:17Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/the-design-concept-of-a-new-ramp-for-homai-replacing-the-sta-4MZRHYLKJRHL3JQTGGQXA55IEA.png?auth=960a96ce3b677c516ac42cfa9f6314dbd24196468a48f9305692862aa91908f9&quality=70&width=1024&height=543&focal=559%2C348`,
    industry: [
      `Engineering`
    ],
    companies: [
      { name: `AT`, url: `https://at.govt.nz/` },
      { name: `KiwiRail`, url: `https://www.kiwirail.co.nz/` }
    ],
    comments: [
      {
        user: `Alice Thompson`,
        text: `This is a great initiative! Accessibility improvements like these are long overdue.`,
        time: new Date(`2024-10-03T16:00:48`)
      },
      {
        user: `James Bennett`,
        text: `Removing the steps for a ramp is a fantastic move, especially for those with mobility issues.`,
        time: new Date(`2024-10-03T16:45:26`)
      }
    ]
  },
  {
    id: 3,
    title: `At least 2000 new homes needed to meet Whanganui growth`,
    description: `Whanganui District Council is moving ahead on a business case for a council-led social housing provider to take on a $300 million social housing proposal.`,
    content: `The council is investigating options for a provider to build 1000 affordable homes over the next decade. Capital works manager Rosemary Fletcher said population growth means the district will need at least 2000 new homes by 2034. The council’s pensioner housing stock was also ageing and insufficient to keep up with growth.

      A feasibility report in 2022 said the council pensioner housing portfolio would grow from 275 units to about 470 units by 2050. “We’re predicting our population will grow by 4281 over the next 10 years. Our ageing population is expected to grow by 1.8% per year,” Fletcher said.

      The council was approving around 90 consents per year for new dwellings. “Even if we round that up to 100, as a district we’re still going to be short of around 1000 homes. The mission for a new housing entity would be to contribute to closing this gap.”

      The cost of building 1000 new homes was estimated at $300 million, based on a figure of $300,000 per house. Fletcher said the housing shortfall was identified using data from all sectors related to social housing “in the broadest terms”. The business case would consider and recommend the type of entity that could be established to take on the local housing challenge.

      “When the entity is formed, its purpose and functions will be based on where it can add value,” Fletcher told Local Democracy Reporting. “Potentially it will work to help find solutions to a range of housing issues, which could include social, affordable and older person housing,” Fletcher said.

      “Mixed models for location, funding and ownership or tenancy could all be considered through the entity’s various partnerships. It is a little bit early to say definitively where the housing will be specifically targeted but we continue to be engaged with a range of interested parties to remain informed.

      “Our intention is to continue to work closely with iwi, agencies such as Kāinga Ora, Health, MSD (Ministry of Social Development), developers, and investors who can contribute or have need in this space.”

      Community wellbeing manager Lauren Tamehana said Whanganui had significant housing challenges. “These include high rents, few rental properties available, household incomes below the national average and rising house prices.”

      As of June this year, there were 276 people registered with MSD for social housing. “The council does not have the capacity for this scale of investment, but a standalone entity would allow for a dedicated board with the right capability as well as partnership opportunities,” Tamehana said.

      Establishing a separate entity would also protect the council from financial liability and provide access to central government funding. “It would be able to register and become a Community Housing Provider if needed – and have access to income related rent subsidies for some tenants, operational funding from the Ministry of Housing and Urban Development and potential private equity funding.”

      Tamehana said the business case was being developed to align with principles in the council’s housing strategy: “To support good housing for a wide range of households; work in partnership where appropriate; demonstrate local leadership and influence; and future-proof the needs of our people and district.”

      The council pensioner housing portfolio would be transferred to the new entity along with vacant zoned land for development and possibly cash as a capital contribution. KPMG Wellington government and infrastructure director Joey Shannon told the council’s strategy and policy committee the council would need to decide what level of financial contribution it would need to meet the ambition to increase housing.

      “The intent is to establish a model that is not reliant on ratepayer subsidy to enable continued operation and growth,” Shannon said. “There’s a point-in-time commitment that makes the thing viable, and then the council’s done its dash and it is the responsibility of the entity to raise the revenue through rents, government subsidies and development profits.”

      As an example, the council’s commitment could be selling land below market value, cash or committing to property renewal. Whanganui mayor Andrew Tripe said it was great to see the proposal on the council agenda, particularly as Government social housing provider Kāinga Ora had signalled job cuts and a simplified business model “to just managing social housing as opposed to building it”.

      “We’re taking the bull by the horns, we’re taking charge,” Tripe said. “It further cements our willingness to take housing to the community and for us to have greater control of that.”

      Source: https://www.1news.co.nz/2024/10/02/at-least-2000-new-homes-needed-to-meet-whanganui-growth/`,
    datePosted: new Date(`2024-10-02T14:54:36Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/YICEJLFLORGZNNXWA6KZEY6R2E.jpg?auth=76957acab83465af6ae176bcdc2807874840812c3fc994b9aa782e12e84c657c&quality=70&width=1024&height=608&focal=1280%2C760`,
    industry: [`Engineering`, `Finance`, `Trades`],
    companies: [
      { name: `Fletcher Building`, url: `https://fletcherbuilding.com/` },
      { name: `Kainga Ora`, url: `https://kaingaora.govt.nz/en_NZ/` }
    ],
    comments: [
      { user: `Emma Walker`, 
        text: `This is a great initiative! Whanganui needs affordable housing, and I'm glad to see the council is taking steps.`, 
        time: new Date(`2024-10-02T15:30:46Z`) 
      },
      { user: `Ryan Mitchell`, 
        text: `It’s good to see the council addressing the housing shortage, but I hope they ensure that these homes are built sustainably.`, 
        time: new Date(`2024-10-02T16:45:25Z`) 
      },
      { user: `Sophia Turner`, 
        text: `A dedicated housing provider is a fantastic idea. The partnerships sound promising.`, 
        time: new Date(`2024-10-02T17:10:39Z`) 
      }
    ]
  },
  {
    id: 4,
    title: `Are New Zealand's biggest cities becoming boring backwaters?`,
    description: `Young people leaving, shops closing, restaurants and bars going belly up. How alive are Auckland, Wellington and Christchurch? Julie Hill checks our three biggest cities for a pulse.`,
    content: `For three glorious years in the 1990s, a show called City Life aired on TV2, featuring a crew of hot young Gen X Aucklanders all living in the same apartment block. They were flash digs, considering one was a bar tender, one a stand-up comedian and the rest seemingly unemployed. They caroused at Verona, the Lava Lounge and Cause Célèbre. As a South Island teen, I was deeply impressed.

      Fast forward three decades, and our news media has pronounced our biggest city dead, dangerous and desperately lacking in main character energy. Crime rates are up. Shops are closing down – and not just newcomers; long-standing retail outlets like the three Huckleberry/Harvest stores, which sold health conscious Aucklanders their mung beans for more than three decades, have liquidated; while the city's beloved (if not often frequented) old-style department store Smith & Caughey's, a Christmas institution for generations, is at the very least to be scaling down.

      And the same goes for a slew of beloved restaurants and bars: Fitzroy, Everybody's, Roxy, East St Hall, Conch, Chapel, Omni, Tiger Burger, Pilkingtons, Homeland, Madame George to name a few, (though thankfully not SPQR).

      The midtown area surrounding Aotea Square could politely be described as a work in progress. Its entertainment complex SkyWorld, once a dazzling vision of the future, is now, according to one shopkeeper I spoke to, a “dystopian nightmare”. There’ll be at least another year of disruption from the creation of the City Rail Link. And on top of that there are orange cones... everywhere.

      Yarns out of Pōneke, Wellington are equally fatalistic. The loss of 5000 public sector jobs and counting has reportedly hit Lambton Quay like a tidal wave, sweeping away with it retail and hospitality – Hiakai, Field & Green, Shepherd, Tulsi, Milk Crate, Egmont St Eatery, Amok, and just yesterday Pandoro closed its three cafes, losing more than 20 staff.

      You can blame one of the harshest economic climates we've faced in decades. You can blame the internet. But is it any surprise that young people are leaving the country, mainly for Australia, in literal droves? Have our once sparkly urban centres dissolved into boring backwaters? Are we, as our prime minister put it, a bunch of wet, whiny, inward-looking Negative Nellies?

      Or do we need to harden up and believe in a very imminent future, when trains will be running, the road cones will be gone, the economy will perk up and our urban centres will see a revival?

      Julie Hill is a writer based in Tāmaki Makaurau Auckland.

      Source: https://www.1news.co.nz/2024/09/09/are-new-zealands-biggest-cities-becoming-boring-backwaters/`,
    datePosted: new Date(`2024-09-07T10:26:33Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/nz-cities-XC54WHQBLBGYBKUIPGCJUTEYZA.jpg?auth=0498d0741453ad8cdf003169f6f32eb54d86e5347ffff3f6162dcc51fd554634&quality=70&width=1024&height=576&focal=960%2C540`,
    industry: [`Finance`, `Trades`],
    companies: [
      { name: `AT`, url: `https://at.govt.nz/` },
      { name: `Smith & Caughey's`, url: `https://www.smithandcaugheys.co.nz/?gad_source=1&gclid=Cj0KCQjwjY64BhCaARIsAIfc7Yb4rymqXQQpGMUASVq6eUlSLxG4BGic-Dizi65_Pdf8kZEJIhkPM3EaAuJyEALw_wcB` }
    ],
    comments: [
      { user: `Chris Taylor`, 
        text: `I grew up in Auckland, and it's sad to see so many iconic places closing down. I hope the city can bounce back soon.`, 
        time: new Date(`2024-09-07T12:15:10Z`)  
      },
      { user: `Rachel Adams`, 
        text: `The city definitely feels quieter these days, but I think the City Rail Link will bring a new energy to Auckland when it's done.`, 
        time: new Date(`2024-09-07T14:45:30Z`) 
      },
      { user: `Oliver Jackson`, 
        text: `It's not just Auckland, Wellington has changed a lot too. The closure of all these restaurants and shops is heartbreaking.`, 
        time: new Date(`2024-09-07T16:20:05Z`) 
      }
    ]
  },
  {
    id: 5,
    title: `Health NZ headed for likely near-$1 billion deficit`,
    description: `Health New Zealand Te Whatu Ora's financial position has "continued to deteriorate" in the last quarter, reporting a likely near $1 billion deficit for the last financial year.`,
    content: `The organisation's Quarterly Performance Report was released today, alongside a statement from Health Minister Shane Reti focused on Health NZ demonstrating "encouraging progress" against the Government's non-financial health targets.

      It follows an appearance from Health Commissioner Lester Levy at Parliament's health select committee last month where he was criticised by Labour health spokesperson Ayesha Verrall for not having financial documents for the committee to scrutinise. Those documents are due to be presented to the select committee on October 7.

      Today's quarterly report showed the financial performance of Health NZ declined significantly in the three months to June this year. That slump came after a $299 million forecasted surplus in the previous quarter.

      "Our financial position continued to deteriorate throughout the quarter. We are committed to resetting Health NZ to ensure that every hour and every dollar we put into our services are adding value to patient care and community wellbeing," a foreword from Health NZ chief executive Margie Apa stated.

      "The preliminary and unaudited financial result for the year ended 30 June 2024 is a deficit of $934 million. This is due to one-off impacts amounting to $589 million and deterioration in underlying financial performance."

      Those one-off impacts included Covid-19 stock written off or consumed, increased costs for noncompliance with the Holidays Act - an issue that has plagued most New Zealand employers, public and private - as well as Covid-19 funding that was not used and returned to the public purse.

      "A key contributor to the deterioration in underlying financial performance is staffing exceeding the 2023/24 budget, accompanied by higher outsourcing across all employment groups," Apa reported.

      Health NZ cared for more people in the 2023/2024 financial year than ever before, she wrote, and there were increased discharges and complex treatments. She said that was likely in line with population growth.

      There were "highlights" in non-financial performance also, she said, including the proportion of people waiting more than four months for a first specialist assessment falling by 1.9%. For procedures, it reduced by 3.7% compared with the previous quarter.

      The proportion of under 25-year-olds seen by specialist mental health services within three weeks of referral also increased by 4% which was "encouraging as this represents a population group who... are exhibiting increased demand for support."

      Newborn enrolment also increased, which boded well for improving childhood immunisation rates and ongoing care, she said.

      Challenges ahead included increasing pharmacy and other providers offering vaccinations.

      "Although there has been an increased uptake in pharmacists training, we have work to do to promote this as a safe option."

      Waitlists continued to be a problem also, she wrote, and while there had been "efforts" over the financial year to reduce the "tail of long waiters" and those waiting more than a year for a procedure, it still increased in the quarter.

      Source: https://www.1news.co.nz/2024/10/03/health-nz-headed-for-likely-near-1-billion-deficit/`,
    datePosted: new Date(`2024-10-03T16:20:12Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/health-minister-shane-reti-file-photo-EPVCLOHEHJHJXOMRLSA6VSYQA4.jpg?auth=c1fc7f035d15a633e641387f9f64ba55a3c4a3dab967a1519002de90d249fb64&quality=70&width=1024&height=576&focal=504%2C233`,
    industry: [`Finance`, `Health`],
    companies: [
      { name: `Health NZ`, url: `https://www.health.govt.nz/` }
    ],
    comments: [
      { user: `Emily Carter`, 
        text: `This is a concerning situation. Health NZ has been struggling for a while now, and a $1 billion deficit is no small issue.`, 
        time: new Date(`2024-10-03T17:45:23Z`)
      },
      { user: `James Whitmore`, 
        text: `The deficit is alarming, but it's good to see progress in the non-financial targets like mental health services for young people. They need all the help they can get right now.`, 
        time: new Date(`2024-10-03T18:20:14Z`) 
      },
      { user: `Sarah Li`, 
        text: `I hope they address the staffing issues soon. Outsourcing healthcare staff is not a sustainable long-term solution.`, 
        time: new Date(`2024-10-03T19:10:45Z`) 
      }
    ]
  },
  {
    id: 6,
    title: `Lower interest rates slow to flow through the housing market`,
    description: `Lower interest rates are unlikely to provide an immediate boost to a softening housing market, CoreLogic economists say, as new data shows national property values falling for the sixth consecutive month in August.`,
    content: `The data provider's latest Home Value Index revealed a 0.5% decline in national house values last month, bringing the total fall since February to 3.7% or about $31,100. The median value across all housing stock now sits at $811,583 — about 17% above pre-pandemic levels, but also 17% lower than at the last peak in January 2022.

      Last month, the Reserve Bank dropped the official cash rate for the first time in years with a 25 basis point cut, boosting optimism that inflation was being tamed. CoreLogic chief property economist Kelvin Davidson said the change would have had a positive effect on sentiment, as well as a direct boost to borrowers’ finances.

      "No doubt many households will be feeling happier now that the official cash rate is falling and mortgage rates are headed lower too," the economist said. "Yet the latest, actual fall in values is a timely reminder that the market still faces considerable challenges."

      Values declined in all main centres except Christchurch in August, with Auckland dropping 1% to a median of $1,070,494. Hamilton fell 0.8%, while Tauranga, Dunedin and Wellington saw more modest decreases of less than 0.5%.

      Davidson explained several factors were behind the sluggish market. "For a start, housing affordability is still stretched, while at the same time the labour market downturn is fully underway," he said.

      "Even if people haven’t lost their jobs, the increased feelings of insecurity will still tend to flow through to less enthusiasm to trade property or pay top-dollar.

      "It’s also clear that the bargaining power lies with buyers in a market where the stock of available listings is sitting at multi-year highs. But that’s still only for the more limited pool of buyers who can actually secure the finance. This all adds up to likely further restraint on property values in the coming months, although the potential impact of lower mortgage rates can’t be ignored."

      Debt-to-income ratio caps, unemployment factors in

      Davidson suggested people looking at the market shouldn’t get "unduly pessimistic" about how rising unemployment will affect housing. "Nobody is expecting employment to absolutely crash. Although a rise in the jobless numbers is never pleasant and will also tend to dampen house sales and prices, further significant falls may not necessarily eventuate," he said.

      "That said, a fresh property boom is not our central expectation either."

      He noted formal debt-to-income (DTI) ratio limits could start to meaningfully affect the market once loan rates fall to around 5.5% or lower, potentially by mid-2025 or sooner.

      "One major change from previous cycles is that we now have formal limits on DTIs, and although they’re not binding yet, there will be a meaningful effect down the track, even once you account for the 20% speed limit and the exemption for new-build properties.

      “Our ballpark estimate is that mortgage rates of around 5.5% or less will be low enough for the impact of the DTI rules to become more noticeable in terms of keeping loan sizes lower than people might have been expecting."

      Source: https://www.1news.co.nz/2024/09/05/lower-interest-rates-slow-to-flow-through-the-housing-market/`,
    datePosted: new Date(`2024-09-05T09:10:15Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/economy-housing-ocr-graphic-ZCUWXNNH4FBS7PEKHLCBUXM4CQ.png?auth=3f8764a32c1fdf013c17ab79e9a7f07f5e8859d625620e828dc9ee8017a12482&quality=70&width=1024&height=576&focal=951%2C418`,
    industry: [`Finance`, `Marketing`, `Trades`],
    companies: [
      { name: `Reserve Bank`, url: `https://www.rbnz.govt.nz/` }
    ],
    comments: [
      { user: `Samantha Lee`, 
        text: `The drop in house prices might be good for buyers, but I wonder how this will impact the long-term stability of the housing market.`, 
        time: new Date(`2024-09-05T12:30:49Z`)
      },
      { user: `John Parker`, 
        text: `The fact that bargaining power is shifting to buyers is interesting, but I think it still depends heavily on whether they can secure financing.`, 
        time: new Date(`2024-09-05T13:45:35Z`)
      },
      { user: `Natalie Cooper`, 
        text: `I’m curious to see how the debt-to-income ratio caps will affect the market next year. Could be a game-changer for buyers.`, 
        time: new Date(`2024-09-05T14:10:01Z`) 
      }
    ]
  },
  {
    id: 7,
    title: `Study finds screen time before bed may have little impact on sleep`,
    description: `A new study suggests advice that screens should be turned off an hour or two before bed may be outdated.`,
    content: `After monitoring 85 adolescents between the ages of 11 and 14, researchers at the University of Otago found that the effect of screens on sleep was more about timing than the activity itself.

      The study saw participants wear a camera on their chest from three hours before bed until they went to bed over a week. A second infrared camera was also set up in their bedrooms to capture their screen time while trying to sleep. Participants also wore an actigraph, a device that tracked their sleep.

      It found 99% of participants used screens in the two hours before bed, with more than half using them in bed. A third used them after first trying to go to sleep. Speaking to Breakfast this morning, the project's lead author Dr Bradley Brosnan said the study revealed screens themselves didn't impact sleep.

      Instead, the "real culprit" was looking at screens once you were in bed and trying to sleep. "If you spent 30 minutes scrolling social media, it had a 30-minute impact on how much less sleep you got," Brosnan said.

      He said it was more important to consider timing and how close to sleep screens were used. "And that can be when we're in bed. It's right when we're about to shut our eyes, and we're using screens."

      Brosnan said that doing more "stimulating" things, like chatting with friends or gaming, could lead to worse sleep. "They'd be doing all these things at once, and that was more stimulating."

      Researchers also found this with participants using multiple devices simultaneously, such as watching Netflix on a laptop while playing video games. He said this research was more comprehensive than others because it tracked participants with cameras rather than pen and paper. Brosnan said it was so researchers could catch the kids "streaming rather than dreaming".

      "It was those sneaky moments we really wanted to capture," he said. The main sleep guideline Brosnan suggested was simple: "It's a good idea just to keep devices out of the bedroom." He hoped the research would help identify unhealthy screen habits early so teens could have a better routine in the future.

      Brosnan has been developing Screenwise, an online tool to help parents and whānau better manage their kid's screen usage.

      "Screenwise is about providing realistic, evidence-based tips and tools that parents can easily incorporate into their daily routines," he said in a statement.

      "I'm starting with my community, doing talks and group sessions at local schools, to continue educating parents, youth, and whānau on building healthier screen habits for better sleep and overall well-being."

      Source: https://www.1news.co.nz/2024/09/04/study-finds-screen-time-before-bed-may-have-little-impact-on-sleep/`,
    datePosted: new Date(`2024-09-04T11:34:54Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/woman-on-her-phone-GTTBIQUJJJEZNMT25ZN3QMWOMY.jpg?auth=a8b2ae9a9c0a6f02f0ad6f668c14bd41a2917c5ce7432e0d22327c44c94e1c61&quality=70&width=800&height=533&focal=1060%2C707`,
    industry: [`IT`, `Engineering`, `Health`],
    companies: [
      { name: `Meta`, url: `https://about.meta.com/` },
      { name: `Youtube`, url: `https://www.youtube.com/` },
      { name: `Netflix`, url: `https://www.netflix.com/nz/` }
    ],
    comments: [
      { user: `James Oliver`, 
        text: `It's great that this research focuses on real habits. I see my kids doing the same thing—scrolling right before sleep. Maybe I need to rethink the ‘no screen before bed’ rule.`, 
        time: new Date(`2024-09-04T12:30:12Z`) 
      },
      { user: `Sophia White`, 
        text: `This makes sense. I’ve noticed I have worse sleep when I’m texting or gaming before bed versus just watching videos.`, 
        time: new Date(`2024-09-04T13:15:48Z`)
      },
      { user: `Michael Brown`, 
        text: `I like the idea of keeping devices out of the bedroom entirely. It seems like a simple change that could make a big difference.`, 
        time: new Date(`2024-09-04T13:45:05Z`)
      }
    ]
  },
  {
    id: 8,
    title: `Why we shouldn't expect cyber outages, but prepare for them`,
    description: `Last week the world experienced one of the biggest IT failures in history, when the cybersecurity software CrowdStrike pushed out a new update that crashed computers globally.`,
    content: `The systems are now back online, but how worried should we be of future outages that could grind society to a halt?

      Last Friday, I was sweaty, stressed and seemingly skint in Bangkok — I was unable to book a taxi to the airport ahead of my 19-hour multi-transit flight home to New Zealand. I borrowed cash from a friend and managed to get to the airport with less than an hour till boarding time — where I quickly realised I wasn’t alone.

      The CrowdStrike IT outage had halted global operating systems — more than 8.5 million Microsoft Windows devices had crashed. Banks, airports, hospitals, TV stations and supermarkets were knocked to submission in an event that computer science experts say could have been avoided if back-up systems had been in place.

      Given our reliance on IT systems, how likely is it that society can grind to a halt at any moment?

      David Tuffley, cybersecurity expert and senior lecturer at Australia’s Griffith University, says an apocalyptic end-of-the-web scenario is unlikely. “The internet is actually a very reliable machine. The reason why this was so catastrophic is that credit card processing is integrated into so many different things now, that really everything that had the Crowdstrike Falcon product installed on it, had a problem — they’re the computers that fell over.”

      Tuffley says to break the internet for a significant period of time would require an incredibly rare geomagnetic storm. A storm like this took place in 1859, called the Carrington Event. It caused electric shocks to humans, sparked infrastructure and set some telegraph stations ablaze across Europe and North America.

      If this were to happen today, the physical infrastructure of the internet would need to be fried and gradually rebuilt over months, with data replaced via back-ups not damaged in the storm. “But that’s most unlikely,” Tuffley says.

      Allyn Robins, AI lead of the New Zealand-based technology think tank Brainbox Institute compared the CrowdStrike situation to a different event — the 1962 loss of an $80 million NASA rocket due to a single missing hyphen in its code.

      “That’s why it’s crucial to have extremely robust security and quality assurance practices in place, and that’s where CrowdStrike failed — if they’d been checking and fixing their code as carefully as they should have, this error never would have slipped through,” he said. CrowdStrike chief executive George Kurtz issued a public apology on the day of the outage, saying it “was caused by a defect found in a Falcon content update for Windows hosts”.

      But what if technology could be used maliciously to break the internet?

      Tech experts assume the global technological halt was because of something called “full regression testing” not taking place. This hasn’t been publicly confirmed or denied by CrowdStrike yet.

      Tuffley says Falcon had issued an update causing Windows PCs to fall over. “In software engineering there’s a colourful word for it, they call it ‘a deadly embrace’ — when the bugged update got onto the Windows machine, it caused a logic error that caused Windows to crash.”

      Logic errors are coding errors only detectable within computer systems — they’re not words or images that are easily picked up by human eyes. The technical process of full regression testing would have noticed the logic error that sparked the conflict between CrowdStrike’s Falcon update and Windows’ operating systems, Tuffley says.

      However, some phishing scammers did take advantage of those impacted by the outage, promoting fake support websites and posing as banks assisting frustrated customers. Although not entirely impossible, Allyn Robins says it would be difficult for cyber criminals to take advantage of this specific fault directly.

      “The fault shuts systems down, making it difficult to use them nefariously, or at all,” he said.

      Why back-up plans are so important

      Crowdstrike is used by nearly 300 of the Fortune 500 Companies. Global agencies and the general public were unconsciously counting on the technology to work seamlessly throughout any background updates.

      David Tuffley says a concept called “redundancy” is a critical component of both cybersecurity and overall business planning. For example, diesel generators are an example of “redundancy” used in rural New Zealand during power outages to back up electricity, maintaining customers’ trust in power companies — a concept called business continuity.

      “It involves creating multiple layers of backup systems, processes, and resources to ensure that operations can continue smoothly even if one or more components fail.” Cloud back-ups are an example of this, and would avoid future outages, data loss and ensure resilience against cyber attacks, he says.

      “The reason that there weren’t redundant backup systems already is that it costs money and time, and organisations rarely want to spend that unless they feel they have to,” Allyn Robins says. So, both Robins and Tuffley say the possibility of the internet locking down for a long time is not entirely impossible, but it is highly unlikely.

      What is more likely, they say, is an oncoming shift to tighten back-up systems across the planet.

      By Ellie Franco

      Source: https://www.1news.co.nz/2024/07/25/why-we-shouldnt-expect-cyber-outages-but-prepare-for-them/`,
    datePosted: new Date(`2024-07-25T14:23:10Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/the-crowdstrike-it-outage-had-halted-global-operating-system-PP44IJWTXZH7FPUGDOBKMS3IWM.jpg?auth=e0f0543baa71850437f393acc6c3120f75417c66220a0607ed07bb79eabe1f77&quality=70&width=1024&height=576&focal=938%2C502`,
    industry: [`IT`, `Engineering`],
    companies: [
      { name: `CrowdStrike`, url: `https://www.crowdstrike.com/platform/?utm_campaign=brand&utm_content=crwd-brand-apj-anz-en-psp-x-trl-x-tct-x_x_x_core-x&utm_medium=sem&utm_source=goog&utm_term=crowdstrike&cq_cmp=19634319511&cq_plac=&gad_source=1&gclid=Cj0KCQjwjY64BhCaARIsAIfc7YZHYKSeVGnMNdLXvzuTtcweYpszGg5hDCfDy0lJpnAY2JP2_XsRcT0aAtSEEALw_wcB` },
      { name: `Microsoft`, url: `https://www.microsoft.com/en-nz` }
    ],
    comments: [
      { user: `Kevin Turner`, 
        text: `CrowdStrike really dropped the ball on this one. No excuse for not having proper regression testing in place.`, 
        time: new Date(`2024-07-25T17:45:27Z`)
      },
      { user: `Rachel Moore`, 
        text: `While it’s good to know a total internet shutdown is unlikely, this event shows that cyber resilience needs to be a bigger priority.`, 
        time: new Date(`2024-07-25T18:20:39Z`)
      },
      { user: `Michael Greene`, 
        text: `The outage was definitely inconvenient, but I’m glad it’s prompted more conversations about cybersecurity and redundancy.`, 
        time: new Date(`2024-07-25T19:10:54Z`) 
      }
    ]
  },
  {
    id: 9,
    title: `The Kiwi innovators driving Australia's EV market boom`,
    description: `While New Zealand's electric vehicle (EV) market is slowing down due to policy changes, Australia's EV sector is accelerating with several Kiwi tech companies jumping on the opportunity.`,
    content: `A growing number of Kiwi companies have capitalised on Australia's government incentives and increased demand for sustainable transport solutions.

      From Tauranga-based electric motorbike manufacturer UBCO to Christchurch's EV charging company Evnex, Kiwi ingenuity is once again proving to be a major player across the Tasman.

      UBCO powers up Australia Post

      Last week, UBCO announced it had secured a landmark deal with one of Australia's biggest companies — Australia Post. Renowned for rugged electric utility bikes, UBCO would provide a new fleet of electric motorbikes for postal delivery services.

      It followed an 18-month trial across multiple states, positioning the company at the forefront of Australia's electric vehicle movement. "This has been something we've been going after for a little over 18 months," said UBCO chief executive Oliver Hutaff.

      He said his company "bet a large portion" of its future to be successful in fleets and the deal with Australia Post was an example of that. "We knew we had the right design and engineering teams in New Zealand to be able to execute this." With 175 bikes set to be deployed initially, there was potential for a much larger rollout — possibly reaching 10,000 electric bikes across the country.

      Evnex's expansion across the ditch

      New Zealand EV charging company Evnex has also tapped into Australia's growing EV market.

      Founder Ed Harvey said while the Kiwi market has struggled due to the scrapping of government subsidies — namely the clean car discount — Australia's EV sector is still experiencing rapid growth.

      "Australian revenue will probably overtake New Zealand revenue in the next two to three months," Harvey said. He said that growth was due to strong federal and state incentives, which were propelling the adoption of electric vehicles, and securing investment in Australia was also easier.

      "There's a lot more activity here, and it's been a really positive move for us," Harvey added. "In New Zealand, a lot of money is being put back into the housing market, which is, unfortunately, not the most productive asset. We'd love to see policy changes that encourage New Zealanders to put more money into business." With declining EV sales in New Zealand, Evnex was looking to across the Tasman to sustain its operations, and the move has so far appeared to be paying off.

      List of Kiwi innovators grows

      UBCO and Evnex weren't the only New Zealand companies making waves in Australia. Earlier this year, Kiwi-owned AI company Arcanum opened its first Australian office too, adding to a broader trend of New Zealand businesses seeking growth opportunities across the ditch.

      "If you can differentiate and have a really clear focus on what your business will specialise in, you can succeed," said Harvey. He said Kiwi tech firms were not only surviving, but thriving abroad and showcased the innovative spirit that had long been synonymous with New Zealand entrepreneurship.`,
    datePosted: new Date(`2024-09-08T16:22:09Z`),
    imageUrl: `https://tvnz-1-news-prod.cdn.arcpublishing.com/resizer/v2/australia-post-has-signed-a-deal-with-new-zealand-electric-u-RH5DQRFJOJEGHNMZLBSV7SGFRM.jpg?auth=a9aa71d4b136b703b73f8ae8a2a5f22468ea044a03999467c544ae364a694431&quality=70&width=800&height=450&focal=1289%2C223`,
    industry: [`Marketing`, `Engineering`],
    companies: [
      { name: `UBCO`, url: `https://ubco.co.nz/` }
    ],
    comments: [
      {
        user: `Samantha Lee`,
        text: `It's amazing to see Kiwi companies like UBCO leading the charge in Australia's EV market! This deal with Australia Post is a game changer.`,
        time: new Date(`2024-09-08T17:15:36Z`),
      },
    ],
  },
  {
    id: 10,
    title: `AA Insurance fined over misleading no-claims bonus offer`,
    description: `AA Insurance (AAI) has been ordered to pay a multimillion-dollar penalty for misleading customers and overcharging them to the tune of $11 million.`,
    content: `The High Court imposed a near $6.2m penalty on the insurer for failing to apply multi-policy and membership discounts, as well as guaranteed no-claims bonuses. The Financial Markets Authority (FMA), which took action against the insurer, said the breaches primarily arose out of poor systems and processes.

      The High Court ruled that between 2015 and 2020, AA misled customers about its multi-policy discount offer and misrepresented that certain eligible customers would receive its guaranteed no-claims bonus for life.

      "While [AAI's] marketing material represented existing policyholders who added another policy would receive the discount immediately, AAI's systems were set up to apply the discount only once the original policy was up for renewal," the FMA said.

      The court found the failure to apply multi-policy discounts affected 112,463 customers, who were overcharged a total of $4.89m. The failure to apply a discount to AA members affected 90,129 customers, who were overcharged $2.95m.

      The court also found AAI overcharged 17,973 eligible customers $3.28m after it failed to apply its guaranteed no-claims bonus benefit on its comprehensive car insurance policies. "AAI misrepresented that eligible customers would receive its guaranteed no claims bonus 'for life'," the FMA said.

      "Until December 2011, AAI offered the bonus for each customer's lifetime, providing the customer remained insured with AAI. After that date, the benefit was amended so that the bonus was applicable to the life of each customer's policy only." However, it said some of AAI's marketing continued to use the "for life" language.

      For breaching financial markets law, Justice Laura O'Gorman imposed a pecuniary penalty with a starting point of $9.5m, a discount of 35 percent and a final penalty of $6.175m. "Customers are entitled to feel secure that insurance premiums will be charged, and discounts applied, in accordance with policy terms and as represented in marketing material," O'Gorman said in her decision.

      "Customers cannot be expected to double-check the precise details of transactions. They are entitled to trust the accuracy of their insurer's systems and processes."`,
    datePosted: new Date(`2024-10-07T17:09:15Z`),
    imageUrl: `https://media.rnztools.nz/rnz/image/upload/s--9zChfnkT--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1643717905/4OAQREP_copyright_image_116807?_a=BACCd2AD`,
    industry: [`Marketing`],
    companies: [
      { name: `AA Insurance`, url: `https://www.aainsurance.co.nz/` }
    ],
    comments: [
      {
        user: `Michael Thompson`,
        text: `This is disappointing from a company like AA Insurance. Customers deserve transparency, and it's frustrating to see such large-scale overcharging.`,
        time: new Date(`2024-10-07T17:40:09Z`),
      },
      {
        user: `Sarah Williams`,
        text: `It’s concerning that this went on for so long without being noticed. Hopefully, the fine will push insurers to improve their systems and be more accountable.`,
        time: new Date(`2024-10-07T18:10:28Z`),
      },
      {
        user: `John Carter`,
        text: `I always thought AA was a trustworthy company. This news has definitely shaken my confidence in their services.`,
        time: new Date(`2024-10-07T18:45:46Z`),
      },
    ],
  },
]

// Function to seed the News collection
const seedNews = async () => {
  try {
      await News.deleteMany(); // Delete all existing news
      await News.insertMany(news); // Insert the dummy news
      console.log('News data seeded successfully!');
      mongoose.connection.close();
  } catch (error) {
      console.error('Error seeding news data:', error);
      mongoose.connection.close();
  }
};

seedNews();
