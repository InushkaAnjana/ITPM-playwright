const { test, expect } = require("@playwright/test");

const cases = [
  {
    id: "Pos_Fun_0001",
    name: "Convert polite request",
    input: "karuNaakaralaa mata podi kaalayak dhenna puLuvandha?",
    expected: "කරුණාකරලා මට පොඩි කාලයක් දෙන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0002",
    name: "Convert plural pronoun usage",
    input: "api gedhara yamu",
    expected: "අපි ගෙදර යමු",
  },
  {
    id: "Pos_Fun_0003",
    name: "Convert mixed English brand names",
    input: "mata WiFi eka connect karanna bae",
    expected: "මට WiFi එක connect කරන්න බැ",
  },
  {
    id: "Pos_Fun_0004",
    name: "Convert sentence with place name",
    input: "api Kandy yanna hadhannee adha",
    expected: "අපි Kandy යන්න හදන්නේ අද",
  },
  {
    id: "Pos_Fun_0005",
    name: "Convert currency format",
    input: "eeka Rs. 2500k",
    expected: "ඒක Rs. 2500ක්",
  },
  {
    id: "Pos_Fun_0006",
    name: "Sinhala output updates automatically in real-time",
    input: "api hamuvenne 6.45 PM ta",
    expected: "අපි හමුවෙන්නෙ 6.45 PM ට",
  },
  {
    id: "Pos_Fun_0007",
    name: "Sinhala output updates automatically in real-time",
    input: "magea ammaa ada udhee mata kivvaa api raeeta kaema gedhara ganna kiyala, ehema nisaa mama kalinma yanna hithuvaa",
    expected: "මගේ අම්මා අඩ උදේ මට කිව්වා අපි රෑට කැම ගෙදර ගන්න කියල, එහෙම නිසා මම කලින්ම යන්න හිතුවා",
  },
  {
    id: "Pos_Fun_0008",
    name: "Convert polite request with explanation",
    input: "karuNaakaralaa mata podi kalayak dhenna, mokadha mama me vaedee avasan karala enna hithan inne",
    expected: "කරුණාකරලා මට පොඩි කලයක් දෙන්න, මොකද මම මෙ වැඩේ අවසන් කරල එන්න හිතන් ඉන්නේ",
  },
  {
    id: "Pos_Fun_0009",
    name: "Convert mixed Singlish + English work-related sentence",
    input: "mama office giyaata passe meeting eka thiyenavaa kiyala manager mata email ekak evvaa",
    expected: "මම office ගියාට පස්සෙ meeting එක තියෙනවා කියල manager මට email එකක් එව්වා",
  },
  {
    id: "Pos_Fun_0010",
    name: "Sinhala output updates automatically in real-time",
    input: "oyaa heta udhee enne kohomadha kiyala mata dhaenaganna oonee, mokadha api kalin plan ekak hadhanna oonee",
    expected: "ඔයා හෙට උදේ එන්නෙ කොහොමද කියල මට දැනගන්න ඕනේ, මොකද අපි කලින් plan එකක් හදන්න ඕනේ",
  },
  {
    id: "Pos_Fun_0011",
    name: "Convert sentence with plural pronouns and planning",
    input: "api lamayi ekka adha havasa park eka lagata yanna hadhanna inne, namuth vaessa aavoth api plan eka venas karanavaa",
    expected: "අපි ලමයි එක්ක අද හවස park එක ලගට යන්න හදන්න ඉන්නේ, නමුත් වැස්ස ආවොත් අපි plan එක වෙනස් කරනවා",
  },
  {
    id: "Pos_Fun_0012",
    name: "Sinhala output updates automatically in real-time",
    input: "mama gedhara yanne raeeta, namuth enne ikmanata nemei",
    expected: "මම ගෙදර යන්නෙ රෑට, නමුත් එන්නෙ ඉක්මනට නෙමේ",
  },
  {
    id: "Pos_Fun_0013",
    name: "Convert sentence with date and time formats",
    input: "api meeting eka thiyaganne 2025/08/14 udhee 9.30 AM kiyala kalinma manager kiyalaa thiyenavaa",
    expected: "අපි meeting එක තියගන්නෙ 2025/08/14 උදේ 9.30 AM කියල කලින්ම manager කියලා තියෙනවා",
  },
  {
    id: "Pos_Fun_0014",
    name: "Sinhala output updates automatically in real-time",
    input: "mata eeka poddak amaaruu kiyala hithenavaa, mokadha mama me vaedee kalin karala naee",
    expected: "මට ඒක පොඩ්ඩක් අමාරූ කියල හිතෙනවා, මොකද මම මෙ වැඩේ කලින් කරල නෑ",
  },
  {
    id: "Pos_Fun_0015",
    name: "Convert long paragraph with mixed Singlish + English and planning context",
    input: "api ilaga sathiya travel ekak yanna plan karala inne kiyala kalinma kathaa unaa, namuth budget eka hariyata balala thibbe naehae. passe mama online hotel booking site balala prices compare karala, api Kandy  yanna hodhadha  kiyala hithanna patan gaththaa. mehema decisions ganna kalin weather report eka balanna oonee kiyala mage yaaluva mata mathak kalaa",
    expected: "අපි ඉලග සතිය travel එකක් යන්න plan කරල ඉන්නේ කියල කලින්ම කතා උනා, නමුත් budget එක හරියට බලල තිබ්බෙ නැහැ. පස්සෙ මම online hotel booking site බලල prices compare කරල, අපි Kandy  යන්න හොදද  කියල හිතන්න පටන් ගත්තා. මෙහෙම decisions ගන්න කලින් weather report එක බලන්න ඕනේ කියල mage යාලුව මට මතක් කලා",
  },
  {
    id: "Pos_Fun_0016",
    name: "Convert medium-length daily explanation with reason",
    input: "adha udhee mama bus eka missa vuna nisaa office yanna podi parakkuvak unaa kiyala supervisor ta dhanvanna unaa",
    expected: "අද උදේ මම bus එක මිස්ස වුන නිසා office යන්න පොඩි පරක්කුවක් උනා කියල supervisor ට දන්වන්න උනා",
  },
  {
    id: "Pos_Fun_0017",
    name: "Convert medium mixed Singlish + English planning sentence",
    input: "api weekend eka free nam movie ekak balala passe dinner ekak ganna plan karala inne",
    expected: "අපි weekend එක free නම් movie එකක් බලල පස්සෙ dinner එකක් ගන්න plan කරල ඉන්නේ",
  },
  {
    id: "Pos_Fun_0018",
    name: "Convert question with emotion",
    input: "mata adha vaeda karanna baehae kiyala hithenavaa mokadha mata podi asaniipayak thiyenavaa",
    expected: "මට අද වැඩ කරන්න බැහැ කියල හිතෙනවා මොකද මට පොඩි අසනීපයක් තියෙනවා",
  },
  {
    id: "Pos_Fun_0019",
    name: "Convert long daily-life paragraph with mixed tense and reasoning",
    input: "adha  traffic godak thibba nisaa mama late unaa kiyala manager ta call ekak karala kiyanna unaa. ehema dheyakata mama kalin plan karala thibbe naehae namuth eeka mage varadha kiyala mama piligannavaa",
    expected: "අද  traffic ගොඩක් තිබ්බ නිසා මම late උනා කියල manager ට call එකක් කරල කියන්න උනා. එහෙම දෙයකට මම කලින් plan කරල තිබ්බෙ නැහැ නමුත් ඒක mage වරද කියල මම පිලිගන්නවා",
  },
  {
    id: "Pos_Fun_0020",
    name: "Sinhala output updates automatically in real-time",
    input: "mata baya hithenavaa mokakdha karanne?",
    expected: "මට බය හිතෙනවා මොකක්ද කරන්නේ?",
  },
  {
    id: "Pos_Fun_0021",
    name: "Sinhala output updates automatically in real-time",
    input: "magee NIC eka gedhara thiyenavaa",
    expected: "මගේ NIC එක ගෙදර තියෙනවා",
  },
  {
    id: "Pos_Fun_0022",
    name: "Convert unit of measurement",
    input: "mata siini 500g oonee",
    expected: "මට සීනි 500g ඕනේ",
  },
  {
    id: "Pos_Fun_0023",
    name: "Convert long paragraph with mixed Singlish + English and planning context",
    input: "pasugiya maasee mama office work eka nisa godak stress unaa, ehema nisa weekend eka relax venna short trip ekak plan karanna hithuva. mama google maps use karala locations balala, travel time calculate karala, train schedule hari bus options hari monavadha easy kiyala check kalaa. ehema check karadhdhi food costs, accommodation availability, saha safety factors okkoma consider karala decisions ganna ona kiyala mata therunaa. ithin final decision eka gaththata passe, mage family knows karala leave apply karala arrangements tika hariyata kalaa",
    expected: "පසුගිය මාසේ මම office work එක නිස ගොඩක් stress උනා, එහෙම නිස weekend එක relax වෙන්න short trip එකක් plan කරන්න හිතුව. මම google maps use කරල locations බලල, travel time calculate කරල, train schedule හරි bus options හරි මොනවද easy කියල check කලා. එහෙම check කරද්දි food costs, accommodation availability, සහ safety factors ඔක්කොම consider කරල decisions ගන්න ඔන කියල මට තෙරුනා. ඉතින් final decision එක ගත්තට පස්සෙ, mage family knows කරල leave apply කරල arrangements ටික හරියට කලා",
  },
  {
    id: "Pos_Fun_0024",
    name: "Convert question with pronoun variation",
    input: "oyaalaa enne kavadhdha?",
    expected: "ඔයාලා එන්නෙ කවද්ද?",
  },
  {
    id: "Neg_Fun_0001",
    name: "Validate automatic space insertion between Sinhala and English words",
    input: "mama office yanne",
    expected: "මම office යන්නේ",
  },
  {
    id: "Neg_Fun_0002",
    name: "Random character string without meaning",
    input: "bcsjdhcbsjdbcjhbchbdjb",
    expected: "[No meaningful output expected]",
  },
  {
    id: "Neg_Fun_0003",
    name: "Validate cleaning of unnecessary symbols and punctuation",
    input: "((api)) yamu!!!",
    expected: "අපි යමු",
  },
  {
    id: "Neg_Fun_0004",
    name: "Validate reduction of repeated words in mid-length conversational input",
    input: "mama mama mama today office yanavaa kiyala kiyala hithala inne, namuth hariyata sure nae",
    expected: "මම අද office යනවා කියලා හිතලා ඉන්නේ, නමුත් හරියට sure නැ",
  },
  {
    id: "Neg_Fun_0005",
    name: "Validate removal of irrelevant symbols from mid-length sentences",
    input: "api trip ekata plan karala inne??? namuth cost eka $$$ vaedi kiyala hithenava",
    expected: "අපි trip එකට plan කරල ඉන්නේ නමුත් cost එක වැඩි කියල හිතෙනව",
  },
  {
    id: "Neg_Fun_0006",
    name: "Validate incorrect transliteration when English and Singlish words are tightly joined",
    input: "lastweek api beachgiyama godak crowd thibba",
    expected: "පසුගිය සතියේ අපි beach ගියම ගොඩක් crowd තිබ්බා",
  },
  {
    id: "Neg_Fun_0007",
    name: "Validate improper handling of repeated emphasis words",
    input: "mee malalassanayilassanayilassanayi",
    expected: "මේ මල ලස්සනයි",
  },
  {
    id: "Neg_Fun_0008",
    name: "Validate normalization failure for extreme slang with line breaks in multi-line input",
    input: "adoo machaang ithinka nam patta scene ekak ban                      api giyoth sure supiri venava                         hariyata plan ekak nae ithin",
    expected: "අඩෝ මචන්ග් ඉතින්ක නම් පට්ට scene එකක් බන්  අපි ගියොත් sure සුපිරි වෙනව හරියට plan එකක් නැ ඉතින්",
  },
  {
    id: "Neg_Fun_0009",
    name: "Validate failure to insert missing spaces in short joined Singlish input",
    input: "oyaaenneedhaheta",
    expected: "ඔයා එන්නේද හෙට",
  },
  {
    id: "Neg_Fun_0010",
    name: "Sinhala output updates automatically in real-time",
    input: "adooo ban                adha plan eka full avul                 api kalin kiyala thibba                            dhaen mokadha karanne",
    expected: "අඩෝ බන් අද plan එක full අවුල් අපි කලින් කියල තිබ්බ දැන් මොකද කරන්නේ",
  }
  
  
  
  
 
];

test.describe("SwiftTranslator - Positive functional tests", () => {
  for (const tc of cases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/");

      const inputBox = page.getByRole("textbox", {
        name: "Input Your Singlish Text Here.",
      });

      await inputBox.fill(tc.input);

      // Assert expected Sinhala appears
      await expect(page.getByText(tc.expected)).toBeVisible();
    });
  }
});