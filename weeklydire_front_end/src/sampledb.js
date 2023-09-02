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
        body: 'Lorem Ipsum articullum bodium. This is the test body of the first article.',
        title: 'Test title',
        thumbnail: 'https://w7.pngwing.com/pngs/954/389/png-transparent-atlantic-hurricane-season-hurricane-harvey-hurricane-irma-tropical-cyclone-storm-tornado-atmosphere-cloud-computer-wallpaper-thumbnail.png'
    },
    {
        id: 2,
        body: 'This is the test body of the SECOND article.',
        title: 'Test title 2',
        thumbnail: 'https://w7.pngwing.com/pngs/954/389/png-transparent-atlantic-hurricane-season-hurricane-harvey-hurricane-irma-tropical-cyclone-storm-tornado-atmosphere-cloud-computer-wallpaper-thumbnail.png'
    },
    {
        id: 3,
        body: '<p><span class="lead-in-text-callout">The web was</span> born to publish documents—in particular, physics papers from <a href="https://www.wired.com/tag/cern/" data-uri="4f6495b9f9ad98cbe8664aebb67f32e1">CERN</a>, the great laboratory where <a href="https://www.wired.com/story/tim-berners-lee-world-wide-web-anniversary/" data-uri="72021f3b594cad14e554035ca6c7bc62">Tim Berners-Lee</a>, the very first web developer, was employed to do smart information things. But technology evolves … Actually, forgive the digression, but technology doesn’t evolve. Everyone says it evolves, but true evolution includes a whole lot of death. Not all software survives, of course (I’m typing this in Google Docs, not on a Xerox Alto), but as anyone who has investigated the Windows control panels can tell you, there’s a lot of decades-old code in our systems. If people evolved like technology, you’d be 6,000 lizards, 30 chimps, and a couple Neanderthals all glued together with an anguished human face stretched across it as a “visual refresh.” &lt;/digression&gt;</p>',
        title: "The 'Form' Element Created the Modern Web. Was It a Big Mistake?",
        thumbnail: 'https://media.wired.com/photos/62757243768b08123dc57719/master/w_960,c_limit/WI060122_ST_Ford_01.jpg'
    }
]