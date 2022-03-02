

 var quotes = [
    "“The Best Way To Get Started Is To Quit Talking And Begin Doing.” – Walt Disney",
    "“The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.” – Winston Churchill",
    "“Don’t Let Yesterday Take Up Too Much Of Today.” – Will Rogers",
    "“You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.” – Unknown",
    "“It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.” – Inspirational Quote By Vince Lombardi",
    "“If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.” – Steve Jobs",
    "“People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do.” – Rob Siltanen",
    "“Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough.” – Og Mandino",
    "“Entrepreneurs Are Great At Dealing With Uncertainty And Also Very Good At Minimizing Risk. That’s The Classic Entrepreneur.” – Mohnish Pabrai",
    "“We May Encounter Many Defeats But We Must Not Be Defeated.” – Maya Angelou",
    "“Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do.” – Johann Wolfgang Von Goethe",
    "“Imagine Your Life Is Perfect In Every Respect; What Would It Look Like?” – Brian Tracy",
    "“We Generate Fears While We Sit. We Overcome Them By Action.” – Dr. Henry Link",
    "“Whether You Think You Can Or Think You Can’t, You’re Right.” – Quote By Henry Ford",
    "“Das Haus bezahlt sich nicht von alleine” - Marcel Eris aka Montanablack88 aka ich-habe-eine-Sprachstörung aka Nazi NFT Verschenker",
    "“Schule ist besser als Schule” - Eligella",
    "“Du liest gerade was, was keinen Sinn hat.” - Random Dude in der Entwicklung",
    "“HTML ist <b>KEINE</b> Programmiersprache” - Absolut jeder Entwickler",
    "“Du kannst C#? Fang <b>sofort</b> bei uns an!!” - Das Team",
    "“Du liest gerade den 20. Spruch” - K.a wer das gesagt hat",
    "“Wieso bist Du denn wieder hier? Schon wieder Tod? Vielleicht helfen 200km/h weniger auf der Autobahn” - Der Tod",
    "“*ey ey* <span style='color:red'>Instagram.com/phenixgames.de</span> *folgt uns ;)*”",
    "“*ey ey* <span style='color:red'>Instagram.com/blackdayz_de</span> *folgt dem ;)*”"
 ]

function loadquote() {
    var randomnumber = Math.floor(Math.random() * quotes.length);
    document.getElementById('quotes').innerHTML = quotes[randomnumber];
}


window.addEventListener('load', function() {
    loadquote()
})

 setInterval(() => {
    loadquote()
 }, 10000);