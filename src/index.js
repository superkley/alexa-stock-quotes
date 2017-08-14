// arn:aws:lambda:eu-west-1:485081797405:function:GetStockPrice

var Alexa = require('alexa-sdk');
var http = require('http');
var alexaApp = null;

const options = {
    TITLE: 'Aktienkurs-Abfrage'
};

var languageStrings = {
    'de-DE': {
        'translation': {
            'TITLE': "Aktuellen Aktienkurs Abfragen",
            'WELCOME_LAUNCH': "Willkommen in Aktienkurs! Nenne mir bitte das Kürzel oder den Namen der Aktie",
            'REQUEST_MESSAGE': "Sage mir bitte das Kürzel oder den Namen der Aktie",
            'HELP_MESSAGE': "Ich kenne die aktuellen Aktienkurse aus dem Xetra System. Von welche Aktie willst du den Kurs wissen?"
        }
    }
};

const stocks = [{
    key: "arl",
    names: ["aarealbank", "aareal"]
}, {
    key: "ads",
    names: ["adidas"]
}, {
    key: "adv",
    names: ["adva"]
}, {
    key: "aixa",
    names: ["aixtron"]
}, {
    key: "alv",
    names: ["allianz"]
}, {
    key: "nda",
    names: ["aurubis"]
}, {
    key: "spr",
    names: ["axelspringer", "springer"]
}, {
    key: "bas",
    names: ["basf"]
}, {
    key: "bayn",
    names: ["bayer"]
}, {
    key: "byw6",
    names: ["baywa"]
}, {
    key: "bc8",
    names: ["bechtle"]
}, {
    key: "bei",
    names: ["beiersdorf"]
}, {
    key: "gbf",
    names: ["bilfingerberger", "bilfinger"]
}, {
    key: "bmw",
    names: ["bmw", "bayerischemotoren"]
}, {
    key: "bnr",
    names: ["brenntag"]
}, {
    key: "cok",
    names: ["cancom", "cancomitsysteme"]
}, {
    key: "afx",
    names: ["carlzeiss", "zeiss"]
}, {
    key: "cls1",
    names: ["celesio"]
}, {
    key: "cbk",
    names: ["commerzbank"]
}, {
    key: "con",
    names: ["continental"]
}, {
    key: "dai",
    names: ["daimler", "mercedes", "mercedesbenz", "daimlerbenz"]
}, {
    key: "dbk",
    names: ["deutschebank"]
}, {
    key: "db1",
    names: ["deutscheboerse"]
}, {
    key: "dpw",
    names: ["deutschepost"]
}, {
    key: "dte",
    names: ["deutschetelekom", "telekom"]
}, {
    key: "dwn",
    names: ["deutschewohnen"]
}, {
    key: "dez",
    names: ["deutz"]
}, {
    key: "dlg",
    names: ["dialogsemiconductor", "dialog"]
}, {
    key: "dou",
    names: ["douglas"]
}, {
    key: "drw3",
    names: ["draegerwerk"]
}, {
    key: "dri",
    names: ["drillisch"]
}, {
    key: "due",
    names: ["duerr"]
}, {
    key: "eoan",
    names: ["eon"]
}, {
    key: "ead",
    names: ["eadsde", "eads", "europeanaeronautic"]
}, {
    key: "zil2",
    names: ["elringklinger", "elring", "klinger"]
}, {
    key: "euca",
    names: ["euromicron"]
}, {
    key: "deq",
    names: ["euroshop", "deutscheeuroshop"]
}, {
    key: "evt",
    names: ["evotec"]
}, {
    key: "fie",
    names: ["fielmann"]
}, {
    key: "fra",
    names: ["fraport"]
}, {
    key: "fntn",
    names: ["freenet"]
}, {
    key: "fre",
    names: ["fresenius"]
}, {
    key: "fme",
    names: ["freseniusmedicalcare", "freseniusmedical", "freseniusmedcare"]
}, {
    key: "gfj",
    names: ["gagfah"]
}, {
    key: "g1a",
    names: ["gea", "gea"]
}, {
    key: "gxi",
    names: ["gerresheimer"]
}, {
    key: "gwi1",
    names: ["gerryweber"]
}, {
    key: "ggs",
    names: ["gigaset"]
}, {
    key: "gil",
    names: ["gildemeister"]
}, {
    key: "gib",
    names: ["gswimmobilien", "gsw"]
}, {
    key: "hnr1",
    names: ["hannoverrueck", "hannoverrueckversicherung"]
}, {
    key: "hei",
    names: ["heidelbergcement", "heidelbergerzement"]
}, {
    key: "hdd",
    names: ["heidelbergerdruckmaschinen"]
}, {
    key: "hen",
    names: ["henkel"]
}, {
    key: "boss",
    names: ["hugoboss"]
}, {
    key: "ifx",
    names: ["infineon", "infineontechnologies"]
}, {
    key: "sdf",
    names: ["kunds", "kpluss"]
}, {
    key: "kco",
    names: ["kloeckner"]
}, {
    key: "kbc",
    names: ["kontron"]
}, {
    key: "krn",
    names: ["krones"]
}, {
    key: "ku2",
    names: ["kuka"]
}, {
    key: "lxs",
    names: ["lanxess"]
}, {
    key: "leo",
    names: ["leoni"]
}, {
    key: "lin",
    names: ["linde"]
}, {
    key: "lha",
    names: ["lufthansa"]
}, {
    key: "man",
    names: ["man", "mann"]
}, {
    key: "mrk",
    names: ["merck"]
}, {
    key: "meo",
    names: ["metro"]
}, {
    key: "mor",
    names: ["morphosys"]
}, {
    key: "mtx",
    names: ["mtuaero", "mtu"]
}, {
    key: "muv2",
    names: ["muenchenerrueck"]
}, {
    key: "ndx1",
    names: ["nordex"]
}, {
    key: "pfv",
    names: ["pfeiffer"]
}, {
    key: "psan",
    names: ["psi", "psi"]
}, {
    key: "pum",
    names: ["puma"]
}, {
    key: "qce",
    names: ["qcells", "kusells"]
}, {
    key: "qia",
    names: ["qiagen"]
}, {
    key: "qsc",
    names: ["qsc"]
}, {
    key: "raa",
    names: ["rational"]
}, {
    key: "rhm",
    names: ["rheinmetall"]
}, {
    key: "rhk",
    names: ["rhoenklinikum"]
}, {
    key: "rwe",
    names: ["rwe"]
}, {
    key: "szg",
    names: ["salzgitter"]
}, {
    key: "srt3",
    names: ["sartorius"]
}, {
    key: "sgl",
    names: ["sglcarbon"]
}, {
    key: "sie",
    names: ["siemens"]
}, {
    key: "sng",
    names: ["singulustechnologies", "singulus"]
}, {
    key: "skyd",
    names: ["sky", "skai", "skydeutschland"]
}, {
    key: "s92",
    names: ["smasolar", "smasolar", "sma"]
}, {
    key: "sow",
    names: ["software", "softwareag"]
}, {
    key: "swv",
    names: ["solarworld"]
}, {
    key: "saz",
    names: ["stada", "stadaarzneimittel"]
}, {
    key: "sbs",
    names: ["stratecbiomedical", "stratek"]
}, {
    key: "szu",
    names: ["suedzucker"]
}, {
    key: "smhn",
    names: ["suessmicrotec"]
}, {
    key: "sy1",
    names: ["symrise"]
}, {
    key: "tka",
    names: ["thyssenkrupp", "thyssen", "krupp"]
}, {
    key: "tui1",
    names: ["tui", "tui"]
}, {
    key: "utdi",
    names: ["unitedinternet"]
}, {
    key: "vow",
    names: ["volkswagen"]
}, {
    key: "vos",
    names: ["vossloh"]
}, {
    key: "wch",
    names: ["wackerchemie"]
}, {
    key: "win",
    names: ["wincornixdorf", "nixdorf", "winkor"]
}, {
    key: "wdi",
    names: ["wirecard"]
}, {
    key: "o1bc",
    names: ["xing"]
}, {
    key: "vri",
    names: ["einseinsachtnullnullnull", "118000"]
}, {
    key: "uuu",
    names: ["dreiuholding", "3u"]
}, {
    key: "vsc",
    names: ["viersc", "4sc"]
}, {
    key: "acw",
    names: ["ascreationtapeten", "astapeten"]
}, {
    key: "aaq",
    names: ["aapimplantate", "aap"]
}, {
    key: "nxi",
    names: ["activaresources", "aktiva"]
}, {
    key: "apm",
    names: ["adpeppermedia"]
}, {
    key: "adn1",
    names: ["adesso"]
}, {
    key: "adl",
    names: ["adlerrealestate", "adler"]
}, {
    key: "dvn1",
    names: ["advancedinflightalliance"]
}, {
    key: "vsj",
    names: ["advancedvision"]
}, {
    key: "agx",
    names: ["agennix"]
}, {
    key: "ek7",
    names: ["agriculturalbank"]
}, {
    key: "ab1",
    names: ["airberlin"]
}, {
    key: "are",
    names: ["aire", "aire"]
}, {
    key: "alg",
    names: ["albisleasing", "albis"]
}, {
    key: "as1",
    names: ["aleosolar"]
}, {
    key: "e7t",
    names: ["alexiuminternational", "alexium"]
}, {
    key: "acv",
    names: ["allforonemidmarket"]
}, {
    key: "aei",
    names: ["allgeierholding", "allgeier"]
}, {
    key: "ano",
    names: ["alno"]
}, {
    key: "atf",
    names: ["alphaform"]
}, {
    key: "aox",
    names: ["alstriaoffice", "alstria"]
}, {
    key: "a7a",
    names: ["altira"]
}, {
    key: "aad",
    names: ["amadeusfire", "amadeus"]
}, {
    key: "ian",
    names: ["amphioninnovations", "amphion"]
}, {
    key: "aja",
    names: ["analytikjena"]
}, {
    key: "aro",
    names: ["arcandor"]
}, {
    key: "adm",
    names: ["archerdanielsmidlandcompany", "archerdaniels"]
}, {
    key: "a3e",
    names: ["aristonrealestate", "ariston"]
}, {
    key: "arma",
    names: ["armholdings", "arm"]
}, {
    key: "am3",
    names: ["ascotmining"]
}, {
    key: "5ab",
    names: ["asianbamboo"]
}, {
    key: "asmb",
    names: ["asml", "asml"]
}, {
    key: "aus",
    names: ["atunds"]
}, {
    key: "aof",
    names: ["atosssoftware"]
}, {
    key: "nsu",
    names: ["audi"]
}, {
    key: "abe1",
    names: ["augustatechnologie", "augusta"]
}, {
    key: "av7",
    names: ["avwimmobilien"]
}, {
    key: "vwd",
    names: ["bis", "bis"]
}, {
    key: "bwb",
    names: ["baaderbank"]
}, {
    key: "baf",
    names: ["balda"]
}, {
    key: "bsl",
    names: ["basler"]
}, {
    key: "b5a",
    names: ["bauer"]
}, {
    key: "bvh",
    names: ["bauvereinzuhamburg", "bauvereinhamburg"]
}, {
    key: "use",
    names: ["beateuhse"]
}, {
    key: "beo",
    names: ["bekoholding"]
}, {
    key: "bdt",
    names: ["bertrandt"]
}, {
    key: "bss",
    names: ["betasystemssoftware", "betasysteme"]
}, {
    key: "bij",
    names: ["bijoubrigitte", "brigitte"]
}, {
    key: "bib",
    names: ["biolitec"]
}, {
    key: "bio",
    names: ["biotest"]
}, {
    key: "btba",
    names: ["bmp"]
}, {
    key: "bvb",
    names: ["borussiadortmund", "borussia"]
}, {
    key: "bfc",
    names: ["brainforceholding", "brainforce"]
}, {
    key: "bmm",
    names: ["bruedermannesmann", "mannesmann"]
}, {
    key: "bue",
    names: ["buchde", "buchdeinternetstores"]
}, {
    key: "o2c",
    names: ["catoil", "cat"]
}, {
    key: "cap",
    names: ["capitalstage"]
}, {
    key: "xae",
    names: ["catalis"]
}, {
    key: "csh",
    names: ["cenit"]
}, {
    key: "c3o",
    names: ["centrosolargroup", "centrosolar"]
}, {
    key: "cev",
    names: ["centrotecsustainable", "centrotec"]
}, {
    key: "ctn",
    names: ["centrotherm"]
}, {
    key: "cwc",
    names: ["cewecolorholding", "zewe"]
}, {
    key: "cfc",
    names: ["cfcindustriebeteiligungen", "cfc"]
}, {
    key: "kbu",
    names: ["coloniarealestate"]
}, {
    key: "cmbt",
    names: ["combots"]
}, {
    key: "com",
    names: ["comdirectbank", "comdirect"]
}, {
    key: "cop",
    names: ["compugroupmedical"]
}, {
    key: "ev4",
    names: ["constantinmedien"]
}, {
    key: "fjh",
    names: ["corundfja"]
}, {
    key: "ceda",
    names: ["corporateequitypartners"]
}, {
    key: "c8i",
    names: ["cquadratinvestment"]
}, {
    key: "crz",
    names: ["crcapitalrealestate"]
}, {
    key: "ce2",
    names: ["cropenergies"]
}, {
    key: "evd",
    names: ["ctseventim", "eventim"]
}, {
    key: "bhs",
    names: ["curanum"]
}, {
    key: "cur",
    names: ["curasan"]
}, {
    key: "sco",
    names: ["cybitsholding", "cybits"]
}, {
    key: "drn",
    names: ["dabbank", "dabbank"]
}, {
    key: "dam",
    names: ["datamodul"]
}, {
    key: "dtd2",
    names: ["datadesign"]
}, {
    key: "dex",
    names: ["delticom"]
}, {
    key: "d9c",
    names: ["demagcranes"]
}, {
    key: "loi",
    names: ["deufol"]
}, {
    key: "dba",
    names: ["deutschebeteiligungsag", "deutschebeteiligungs"]
}, {
    key: "ermk",
    names: ["deutscheentertainment"]
}, {
    key: "dgr",
    names: ["deutschegrundstuecksauktion"]
}, {
    key: "dpb",
    names: ["deutschepostbank"]
}, {
    key: "dr0",
    names: ["deutscherohstoff"]
}, {
    key: "dsk1",
    names: ["deutschesteinzeug"]
}, {
    key: "eff",
    names: ["dewb", "dewbvc"]
}, {
    key: "de6",
    names: ["dfdeutscheforfait"]
}, {
    key: "daz",
    names: ["dicasset"]
}, {
    key: "die",
    names: ["dierigholding"]
}, {
    key: "dis",
    names: ["diskuswerke"]
}, {
    key: "d2h",
    names: ["dnickholding"]
}, {
    key: "aj91",
    names: ["doccheck"]
}, {
    key: "hnl",
    names: ["drhoenle"]
}, {
    key: "d2f",
    names: ["dresdnerfactoring"]
}, {
    key: "deg1",
    names: ["deutscheimmobilien", "dtimmobilienholding"]
}, {
    key: "dyk",
    names: ["dyckerhoff"]
}, {
    key: "esy",
    names: ["easysoftware"]
}, {
    key: "euz",
    names: ["eckertundziegler"]
}, {
    key: "e4c",
    names: ["ecotelcommunication"]
}, {
    key: "edl",
    names: ["edel"]
}, {
    key: "efs",
    names: ["effectenspiegel"]
}, {
    key: "ehl",
    names: ["ehlebracht"]
}, {
    key: "eln",
    names: ["electronicsline3000", "electronicsline"]
}, {
    key: "eex",
    names: ["elexis"]
}, {
    key: "elg",
    names: ["elmossemiconductor"]
}, {
    key: "emq",
    names: ["emqtec", "mqtek"]
}, {
    key: "ebk",
    names: ["enbw"]
}, {
    key: "eni1",
    names: ["enispa"]
}, {
    key: "etg",
    names: ["envitecbiogas", "biogas"]
}, {
    key: "ecx",
    names: ["epigenomics"]
}, {
    key: "ehx",
    names: ["essanelle"]
}, {
    key: "e7s",
    names: ["estavis"]
}, {
    key: "jt9",
    names: ["euroasiapremierreal"]
}, {
    key: "kd8",
    names: ["eurotexfinanz", "eurotex", "eurotexfinanz"]
}, {
    key: "xac2",
    names: ["evalueeurope"]
}, {
    key: "evn",
    names: ["evn"]
}, {
    key: "fam1",
    names: ["fame"]
}, {
    key: "faa",
    names: ["fabasoft"]
}, {
    key: "rtm3",
    names: ["finanzhausrothmann"]
}, {
    key: "fla",
    names: ["flatex"]
}, {
    key: "frs",
    names: ["foris"]
}, {
    key: "fev",
    names: ["fortecelektronik"]
}, {
    key: "fmi1",
    names: ["fortunemanagement"]
}, {
    key: "ffm",
    names: ["franconofurt"]
}, {
    key: "fph",
    names: ["francotyppostaliaholding"]
}, {
    key: "cea",
    names: ["friwo"]
}, {
    key: "fpe",
    names: ["fuchspetrolub"]
}, {
    key: "few",
    names: ["funkwerk"]
}, {
    key: "gci",
    names: ["gciindustrie"]
}, {
    key: "ge1",
    names: ["generalideutschlandhold"]
}, {
    key: "gn0",
    names: ["genesisinvest"]
}, {
    key: "gme",
    names: ["gerathermmedical"]
}, {
    key: "gfk",
    names: ["gfk"]
}, {
    key: "gft",
    names: ["gfttechnologies"]
}, {
    key: "2gi",
    names: ["gie"]
}, {
    key: "gir",
    names: ["girindus"]
}, {
    key: "gks",
    names: ["gksoftware"]
}, {
    key: "gmm",
    names: ["grammer"]
}, {
    key: "gm2",
    names: ["greenmntncoffeeroaster"]
}, {
    key: "grf",
    names: ["greiffenberger"]
}, {
    key: "glj",
    names: ["grenkeleasing"]
}, {
    key: "inw",
    names: ["groupbusinesssoftware"]
}, {
    key: "g7b",
    names: ["gwbimmobilien"]
}, {
    key: "was",
    names: ["hundr"]
}, {
    key: "h4i",
    names: ["hahnib"]
}, {
    key: "hab",
    names: ["hamborner"]
}, {
    key: "hhfa",
    names: ["hamburgerhafen", "hamburgerhafenundlogistik", "hamburgerhafen"]
}, {
    key: "h4g",
    names: ["hansagroup"]
}, {
    key: "h9y",
    names: ["hanseyachts"]
}, {
    key: "haw",
    names: ["haweskoholding"]
}, {
    key: "hxci",
    names: ["hcicapital"]
}, {
    key: "hlr",
    names: ["heilersoftware"]
}, {
    key: "h5e",
    names: ["helmaeigenheimbau"]
}, {
    key: "hlg",
    names: ["highlightcommunications"]
}, {
    key: "hot",
    names: ["hochtief"]
}, {
    key: "hws",
    names: ["hoftundwessel"]
}, {
    key: "hlbn",
    names: ["holcim"]
}, {
    key: "hg1",
    names: ["homaggroup"]
}, {
    key: "hbm",
    names: ["hornbachbaumarkt"]
}, {
    key: "htl",
    names: ["hotelde"]
}, {
    key: "bos",
    names: ["hugoboss"]
}, {
    key: "hyw",
    names: ["hydrotecgesellschaft"]
}, {
    key: "hyq",
    names: ["hypoport"]
}, {
    key: "fao2",
    names: ["ifao"]
}, {
    key: "ibb",
    names: ["ibsexcellencen"]
}, {
    key: "inv",
    names: ["identivegroup"]
}, {
    key: "ifm",
    names: ["ifmimmobilien"]
}, {
    key: "iemb",
    names: ["iminternationalmedia"]
}, {
    key: "irp",
    names: ["imperatotalreturn"]
}, {
    key: "inh",
    names: ["indusholding"]
}, {
    key: "ixx",
    names: ["initinnovation"]
}, {
    key: "aagn",
    names: ["integralis"]
}, {
    key: "its",
    names: ["interseroh"]
}, {
    key: "ish2",
    names: ["intershopcommunications"]
}, {
    key: "itn",
    names: ["intertainment"]
}, {
    key: "is7",
    names: ["inticomsystems"]
}, {
    key: "ivx",
    names: ["invisionsoftware"]
}, {
    key: "iqpb",
    names: ["iqpower"]
}, {
    key: "isr",
    names: ["isravision"]
}, {
    key: "ilh",
    names: ["itelligence"]
}, {
    key: "i7n",
    names: ["itnnanovation"]
}, {
    key: "ivg",
    names: ["ivgimmobilien"]
}, {
    key: "ivu",
    names: ["ivutraffictechnologies"]
}, {
    key: "fxxn",
    names: ["jaxx"]
}, {
    key: "jen",
    names: ["jenoptik"]
}, {
    key: "jtt",
    names: ["jetter"]
}, {
    key: "jy8",
    names: ["joyou"]
}, {
    key: "jun3",
    names: ["jungheinrich"]
}, {
    key: "kwg",
    names: ["khdhumboldtwedag"]
}, {
    key: "kh6",
    names: ["kinghero"]
}, {
    key: "ka8",
    names: ["klassikradio"]
}, {
    key: "skb",
    names: ["koenigundbauer"]
}, {
    key: "ksc",
    names: ["kps"]
}, {
    key: "k1r",
    names: ["kromilogistik"]
}, {
    key: "ksb",
    names: ["ksb"]
}, {
    key: "kws",
    names: ["kwssaat"]
}, {
    key: "lus",
    names: ["langundschwarz"]
}, {
    key: "lei",
    names: ["leifheit"]
}, {
    key: "l1o",
    names: ["lloydfonds"]
}, {
    key: "loe",
    names: ["loewe"]
}, {
    key: "lpk",
    names: ["lpkflaserundelectronics"]
}, {
    key: "lsx",
    names: ["lstelcom"]
}, {
    key: "eck",
    names: ["ludwigbeck"]
}, {
    key: "mxh",
    names: ["maxautomation"]
}, {
    key: "mgx",
    names: ["magix"]
}, {
    key: "m5rk",
    names: ["mnatrealestate"]
}, {
    key: "m5z",
    names: ["manzautomation"]
}, {
    key: "mka",
    names: ["marseillekliniken"]
}, {
    key: "mzx",
    names: ["masterflex"]
}, {
    key: "mak",
    names: ["maternuskliniken"]
}, {
    key: "mbb",
    names: ["mbbindustries"]
}, {
    key: "med",
    names: ["mediclin"]
}, {
    key: "mdg",
    names: ["medigene"]
}, {
    key: "mdn",
    names: ["medion"]
}, {
    key: "mhh",
    names: ["medisana"]
}, {
    key: "mum",
    names: ["menschundmaschine"]
}, {
    key: "m3v",
    names: ["mevismedicalsolutions"]
}, {
    key: "fw1",
    names: ["mifa"]
}, {
    key: "mlp",
    names: ["mlp"]
}, {
    key: "mme",
    names: ["mmemoviement"]
}, {
    key: "mbq",
    names: ["mobotix"]
}, {
    key: "mgn",
    names: ["mologen"]
}, {
    key: "mpc",
    names: ["mpc"]
}, {
    key: "mll",
    names: ["muellerdielilalogistik"]
}, {
    key: "mvv1",
    names: ["mvvenergie"]
}, {
    key: "mwb",
    names: ["mwbwertpapierhandelsbank"]
}, {
    key: "nn6",
    names: ["nanorepro"]
}, {
    key: "nuqa",
    names: ["navigatorequitysolutions"]
}, {
    key: "nem",
    names: ["nemetschek"]
}, {
    key: "netk",
    names: ["net"]
}, {
    key: "nxu",
    names: ["nexus"]
}, {
    key: "nlb1",
    names: ["nobelbiocareholding"]
}, {
    key: "nc5",
    names: ["norcominformationtech"]
}, {
    key: "noh1",
    names: ["norskhydroasa"]
}, {
    key: "mont",
    names: ["novavisions"]
}, {
    key: "nbxb",
    names: ["november"]
}, {
    key: "nbg6",
    names: ["nuernbergerbeteiligung"]
}, {
    key: "bdxa",
    names: ["omegaprojectholdings"]
}, {
    key: "o5h",
    names: ["openlimitholding"]
}, {
    key: "oht",
    names: ["oradhitecsystemslimited"]
}, {
    key: "obs",
    names: ["orbis"]
}, {
    key: "o5g",
    names: ["orcogermany"]
}, {
    key: "o4b",
    names: ["ovbholding"]
}, {
    key: "pui",
    names: ["pundi"]
}, {
    key: "pgn",
    names: ["paragon"]
}, {
    key: "p1z",
    names: ["patriziaimmobilien"]
}, {
    key: "pt8",
    names: ["petrotec"]
}, {
    key: "pfd4",
    names: ["pfleiderer"]
}, {
    key: "ps4",
    names: ["phoenixsolar"]
}, {
    key: "png",
    names: ["pironetndh"]
}, {
    key: "put2",
    names: ["plaut"]
}, {
    key: "plea",
    names: ["plenum"]
}, {
    key: "pne3",
    names: ["pnewind"]
}, {
    key: "pql",
    names: ["polisimmobilien"]
}, {
    key: "pah3",
    names: ["porscheautomobil", "porsche"]
}, {
    key: "pra",
    names: ["praktiker"]
}, {
    key: "prc",
    names: ["primacom"]
}, {
    key: "p4t",
    names: ["primiontechnology"]
}, {
    key: "pda",
    names: ["prodvsoftware"]
}, {
    key: "pwo",
    names: ["progresswerkoberkirch"]
}, {
    key: "psm",
    names: ["prosiebensat1", "prosieben"]
}, {
    key: "pus",
    names: ["pulsionmedicalsystems"]
}, {
    key: "tpe",
    names: ["pvatepla"]
}, {
    key: "groa",
    names: ["quanmax"]
}, {
    key: "rsl1",
    names: ["rstahl"]
}, {
    key: "rtc",
    names: ["realtech"]
}, {
    key: "rgb",
    names: ["regenbogen"]
}, {
    key: "ruk",
    names: ["ruecker"]
}, {
    key: "swa",
    names: ["ssw"]
}, {
    key: "sag",
    names: ["sagsolarstrom"]
}, {
    key: "sac",
    names: ["sanochemiapharmazeutika"]
}, {
    key: "srt",
    names: ["sartorius"]
}, {
    key: "slt",
    names: ["schaltbauholding", "schaltbau"]
}, {
    key: "pzs",
    names: ["scherzerundco"]
}, {
    key: "scun",
    names: ["schuler"]
}, {
    key: "sce",
    names: ["schweizerelectronic"]
}, {
    key: "ysn",
    names: ["secunetsecuritynetworks"]
}, {
    key: "sdo",
    names: ["sedoholding"]
}, {
    key: "smn1",
    names: ["senatorentertainment"]
}, {
    key: "f3c",
    names: ["sfcenergie", "sfcenergy"]
}, {
    key: "shwk",
    names: ["shsviveon", "viveon"]
}, {
    key: "sis",
    names: ["siliconsensor"]
}, {
    key: "szz",
    names: ["sinnerschrader"]
}, {
    key: "six2",
    names: ["sixt"]
}, {
    key: "smw",
    names: ["smwirtschaftsberatung", "smwirtschaftsberatungs"]
}, {
    key: "s4a",
    names: ["smtscharf", "smtscharf"]
}, {
    key: "shf",
    names: ["snp"]
}, {
    key: "syt",
    names: ["softing"]
}, {
    key: "sfd1",
    names: ["softline"]
}, {
    key: "sfo",
    names: ["softship"]
}, {
    key: "s2m",
    names: ["solarmillennium"]
}, {
    key: "sfx",
    names: ["solarfabrik"]
}, {
    key: "soo1",
    names: ["solonfuersolartechnik"]
}, {
    key: "syw",
    names: ["sonneundwindbeteiligungen"]
}, {
    key: "spm",
    names: ["splendidmedien"]
}, {
    key: "xd4",
    names: ["strabag"]
}, {
    key: "sax",
    names: ["stroeeroutofhomemedia"]
}, {
    key: "sww",
    names: ["sunways"]
}, {
    key: "sur",
    names: ["surteco"]
}, {
    key: "sys",
    names: ["syskoplan"]
}, {
    key: "syz",
    names: ["syzygy"]
}, {
    key: "teg",
    names: ["tagimmobilien"]
}, {
    key: "ttk",
    names: ["takkt"]
}, {
    key: "tds",
    names: ["tdsinformationstechnologie"]
}, {
    key: "ttr1",
    names: ["technotrans"]
}, {
    key: "tgt",
    names: ["telegate"]
}, {
    key: "tli",
    names: ["teles"]
}, {
    key: "tgh",
    names: ["thiellogistik"]
}, {
    key: "tcg",
    names: ["thomascookgroup"]
}, {
    key: "tim",
    names: ["tipp24"]
}, {
    key: "ero1",
    names: ["tmccontentgroup"]
}, {
    key: "tr61",
    names: ["tmmrealestate"]
}, {
    key: "tgm",
    names: ["tognum"]
}, {
    key: "tfa",
    names: ["tomorrowfocus"]
}, {
    key: "gtk",
    names: ["tonkensagrar"]
}, {
    key: "tv0",
    names: ["travelviva"]
}, {
    key: "tpn",
    names: ["triplan"]
}, {
    key: "tvo",
    names: ["tvloonland"]
}, {
    key: "ums",
    names: ["umsunited"]
}, {
    key: "ubl",
    names: ["unibailrodamco"]
}, {
    key: "ulc",
    names: ["unitedlabels"]
}, {
    key: "up2",
    names: ["updatesoftware"]
}, {
    key: "osp2",
    names: ["ususoftware"]
}, {
    key: "uzu",
    names: ["uzinutz"]
}, {
    key: "vbh",
    names: ["vbhholding"]
}, {
    key: "vbk",
    names: ["verbio"]
}, {
    key: "vtw",
    names: ["versatel"]
}, {
    key: "vws",
    names: ["vestaswindsystems"]
}, {
    key: "vih",
    names: ["vibvermgen"]
}, {
    key: "v6c",
    names: ["viscom"]
}, {
    key: "v3v",
    names: ["vita34international"]
}, {
    key: "via",
    names: ["vivacon"]
}, {
    key: "vt9",
    names: ["vtg"]
}, {
    key: "v33",
    names: ["vtionwirelesstechnology"]
}, {
    key: "wet",
    names: ["wetautomotivesystems"]
}, {
    key: "wom",
    names: ["womworldofmedicine"]
}, {
    key: "wac",
    names: ["wackerneuson"]
}, {
    key: "wsu",
    names: ["washtec"]
}, {
    key: "wi4",
    names: ["weichaipower"]
}, {
    key: "wug",
    names: ["westagundgetalit"]
}, {
    key: "weg1",
    names: ["westgrund"]
}, {
    key: "wig1",
    names: ["wigemedia"]
}, {
    key: "wl6",
    names: ["wilex"]
}, {
    key: "wzm",
    names: ["wizcomtechnologies"]
}, {
    key: "wlv2",
    names: ["wuerttembergische"]
}, {
    key: "wuw",
    names: ["wuestenrotundwuerttemberg", "wuestenrot"]
}, {
    key: "yoc",
    names: ["yoc"]
}, {
    key: "zpf",
    names: ["zapfcreation"]
}, {
    key: "sap",
    names: ["sap"]
}];

exports.handler = function (event, context, callback) {
    console.log("> export handlers");
    var alexa = Alexa.handler(event, context);

    alexa.resources = languageStrings;

    // alexa.appId = 'amzn1.ask.skill.bf2c3de4-8732-4874-b746-6955c2caed06';

    alexa.registerHandlers(
        requestHandler
    );
    alexa.execute();
    console.log("> alexa executed");
};

var requestHandler = {
    'NewSession': function () {
        console.log("> start new session");
        this.emit(':ask', this.t("WELCOME_LAUNCH"), this.t("REQUEST_MESSAGE"));
    },
    "AMAZON.HelpIntent": function () {
        console.log("> help intent");
        this.emit(':ask', this.t("HELP_MESSAGE"), this.t("REQUEST_MESSAGE"));
    },
    "AMAZON.CancelIntent": function () {
        console.log("> cancel intent");
        this.emit(':tell', "Bis zum nächsten Mal!");
    },
    "AMAZON.StopIntent": function () {
        console.log("> stop intent");
        this.emit(':tell', "Bis zum nächsten Mal!");
    },
    'RequestIntent': function () {
        console.log("> request intent");
        alexaApp = this;
        var symbol = 'UNKOWN';
        if (!this.event.request.intent.slots.stock || this.event.request.intent.slots.stock.value === '') {
            this.emit(':ask', this.t("HELP_MESSAGE"), this.t("REQUEST_MESSAGE"));
        } else {
            var stockVal = normalizeName(this.event.request.intent.slots.stock.value);
            symbol = getSymbol(stockVal);
            console.log('> symbol=' + symbol + ' (input=' + stockVal + ')');
        }
        if ('UNKNOWN' == symbol) {
            this.emit(':ask', "Kurs von " + this.event.request.intent.slots.stock.value + " konnte nicht ermittelt werden. Versuch mit einer anderen Aktie?", this.t("REQUEST_MESSAGE"));
        } else {
            getPrice(symbol, function (rsp) {
                var rspStr = rsp.toString().trim();
                console.log("BODY: " + rspStr);
                var info = rspStr.split(',');
                if (info.length == 2) {
                    var price = info[1].replace('.', ',').trim();
                    var name = info[0].replace(/\"/g, '').trim();
                    var cardText = '\n ' + name + ' (' + symbol + '): ' + price +'€';
                    console.log("> card: " + cardText);
                    alexaApp.emit(':askWithCard',  name + ' hat einen aktuellen Kurs von ' + price + ' Euro pro Aktie. Weiter?', 'Nächste Aktie?', 'Aktueller Kurs (Keine Gewähr)', cardText);
                } else {
                    alexaApp.emit(':ask', "Kurs von " + this.event.request.intent.slots.stock.value + " konnte nicht ermittelt werden. Versuch mit einer anderen Aktie?", this.t("REQUEST_MESSAGE"));
                }
            });
        }
    },
    'AMAZON.YesIntent': function () {
        console.log("> start yes intent");
        this.emit(':ask', this.t("REQUEST_MESSAGE"), this.t("REQUEST_MESSAGE"));
    },
    'AMAZON.NoIntent': function () {
        console.log("> no intent");
        this.emit(':tell', "Bis zum nächsten Mal!");
    },
    'Unhandled': function () { // if we get any intents other than the above
        console.log("start> unhandled");
        this.emit(':ask', 'Ich konnte dich nicht verstehen!' + this.t("REQUEST_MESSAGE"), this.t("REQUEST_MESSAGE"));
    }
};

function normalizeName(str) {
    return str.toLowerCase().replace(/\s/g, '').replace('ß', 'ss').replace('ü', 'ue').replace('ä', 'ae').replace('ö', 'oe');
}

function getSymbol(str) {
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        if (stock.key == str) {
            return stock.key;
        }
    }
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        var names = stock.names;
        for (var j = 0; j < names.length; j++) {
            var n = names[j];
            if (n == str) {
                return stock.key;
            }
        }
    }
    console.log("ERROR: no mapping found! (value: " + str + ")");
    return "UNKNOWN";
}

function getPrice(symbol, callback) {
    var options = {
        method: 'GET',
        host: 'download.finance.yahoo.com',
        path: '/d/quotes.csv?f=nl1&s=' + symbol + '.de'
    };
    console.log('< request: ' + options.path);
    var text = '';
    var req = http.get(options, function (res) {
        console.log("Got response: " + res.statusCode);
        res.on("data", callback);
    });
    req.end();
    req.on('error', (e) => {
        console.error('> ERROR: ' + e);
        alexaApp.emit(':ask', "Kurs von " + this.event.request.intent.slots.stock.value + " konnte nicht ermittelt werden. Versuch mit einer anderen Aktie?", this.t("REQUEST_MESSAGE"));
    });
    return text;
}