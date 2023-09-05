export const comments = [
    {
        id: 1,
        body: 'This is the body of the first test comment. Lorem ipsum ad infinitum.',
        subscriber_author: 1,
        articleId: 1
    }
];

export const creators = [
    {
        id: 1,
        first_name: "Geoffrey",
        last_name: "Chaucer",
        email: 'ImAlwaysWrite@example.com',
        password: 'password',
        bio: 'Geoffrey Chaucer was an English poet, author, and civil servant best known for "The Canerbury Tales". More recently, he has written columns for "The Weekly Dire" on topics ranging from modern gardening to rocket science.',
        is_admin: false
    }
];

export const subscribers = [
    {
        id: 1,
        email: 'ISubscribeToThings@example.com',
        password: 'password'
    }
];

export const articles = [
    {
        id: 1,
        body: 'A kindhearted couple who won £100,000 on the Euromillions is planning to spend their winnings on fostering children.\nAlready parents to three children, the couple in their 40s will now convert their garage into extra bedrooms to begin fostering kids in need, a dream they’ve always shared.\nKathleen Reece admits she’s often moaned in the past about her husband Mark playing the Euromillions every week, believing they weren’t lucky enough to ever win.\nAnd she thought Mark was playing a practical joke on her when he asked her to check the winning ticket while he went out to get some milk in North Worcestershire, England.\nBut her daughter helped her double-checked the numbers online. “We called out the winning numbers to each other and, as the realization of what this meant hit us, we sat there in disbelief.”\n“I decided to call the number on the back of the ticket and was talking to a lady from The National Lottery when Mark came home with the milk.\n“I told him to shush, as I was on the phone to The National Lottery. His jaw dropped.\n“He looked at me in disbelief so I put the phone on speaker and the lady confirmed we’d won £100,770.”\nKathleen, Mark and their daughter and two sons all sat in the kitchen staring at each other before hiding the winning ticket in Mark’s passport for safekeeping.\n“I’ve always wanted to foster children,” said Kathleen. “Mark and I discussed it many years ago and then we had our own.\n“My three kids will be leaving home soon and I have too much love to give. I’ve always wanted to foster, however having enough space has always been an issue.”\nKathleen, a full-time teaching assistant said the win was a brilliant way to finish off her summer break.',
        title: 'Couple Wins Lottery--Plans to Foster with the Winnings',
        thumbnail: 'https://www.goodnewsnetwork.org/wp-content/uploads/2023/09/happy-couple-in-40s-Kathleen-and-Mark-Reece-SWNS.jpg',
        tags: ['feel-good']
    },
    {
        id: 2,
        body: 'Hurricane Idalia made landfall near Keaton Beach, Fla., has knocked out power to hundreds of thousands of customers, grounded more than 800 flights and unleashed floods along Florida\'s coast far from where it came ashore as a Category 3 storm early Wednesday morning',
        title: 'Hurricane Idalia Floods Tarpon Springs',
        thumbnail: 'https://media.npr.org/assets/img/2023/08/30/gettyimages-1648519799_custom-38ab3c4594f1f80e8bfa8521a76a6fa3f1ff1804-s1100-c50.jpg',
        tags: ['florida', 'weather']
    },
    {
        id: 3,
        body: '<p><span class="lead-in-text-callout">The web was</span> born to publish documents—in particular, physics papers from <a href="https://www.wired.com/tag/cern/" data-uri="4f6495b9f9ad98cbe8664aebb67f32e1">CERN</a>, the great laboratory where <a href="https://www.wired.com/story/tim-berners-lee-world-wide-web-anniversary/" data-uri="72021f3b594cad14e554035ca6c7bc62">Tim Berners-Lee</a>, the very first web developer, was employed to do smart information things. But technology evolves … Actually, forgive the digression, but technology doesn’t evolve. Everyone says it evolves, but true evolution includes a whole lot of death. Not all software survives, of course (I’m typing this in Google Docs, not on a Xerox Alto), but as anyone who has investigated the Windows control panels can tell you, there’s a lot of decades-old code in our systems. If people evolved like technology, you’d be 6,000 lizards, 30 chimps, and a couple Neanderthals all glued together with an anguished human face stretched across it as a “visual refresh.” &lt;/digression&gt;</p>',
        title: "The 'Form' Element Created the Modern Web. Was It a Big Mistake?",
        thumbnail: 'https://media.wired.com/photos/62757243768b08123dc57719/master/w_960,c_limit/WI060122_ST_Ford_01.jpg',
        tags: ['coding']
    }
]