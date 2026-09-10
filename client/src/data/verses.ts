export interface GitaVerse {
  id: string;
  chapter: number;
  verse: string;
  title: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  reflection: string;
  themes: string[];
  searchText: string;
}

const verse = (
  details: Omit<GitaVerse, "searchText"> & { keywords: string[] },
): GitaVerse => ({
  ...details,
  searchText: [
    details.title,
    details.meaning,
    details.reflection,
    details.themes.join(" "),
    details.keywords.join(" "),
  ].join(". "),
});

/**
 * A carefully selected, lightweight index of verses for everyday reflection.
 * The English copy is an original plain-language summary, not a quotation from
 * a published translation. Keeping the index in the client makes the app fully
 * static and lets retrieval happen without an API or an AI response.
 */
export const VERSES: GitaVerse[] = [
  verse({
    id: "2.13",
    chapter: 2,
    verse: "13",
    title: "Change is part of embodied life",
    sanskrit:
      "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥",
    transliteration:
      "dehino 'smin yathā dehe kaumāraṁ yauvanaṁ jarā |\ntathā dehāntara-prāptir dhīras tatra na muhyati ||",
    meaning:
      "Just as the embodied self moves through childhood, youth, and old age, life also moves through further changes. A steady person is not lost in bewilderment by change.",
    reflection:
      "When a chapter of life is shifting, this verse invites you to notice the change without assuming that change has erased who you are.",
    themes: ["change", "transitions", "identity", "uncertainty"],
    keywords: [
      "growing older",
      "new phase",
      "transition",
      "change",
      "letting go",
      "life stages",
      "uncertain future",
    ],
  }),
  verse({
    id: "2.14",
    chapter: 2,
    verse: "14",
    title: "Difficult feelings are temporary",
    sanskrit:
      "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    transliteration:
      "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino 'nityās tāṁs titikṣasva bhārata ||",
    meaning:
      "Contact with the changing world brings heat and cold, pleasure and pain. These experiences arise and pass; meet them with patience rather than believing they will last forever.",
    reflection:
      "For an uncomfortable moment, this is a reminder to make room for the feeling while remembering that no emotional weather is permanent.",
    themes: ["anxiety", "pain", "patience", "resilience"],
    keywords: [
      "overwhelmed",
      "hard time",
      "bad day",
      "stress",
      "suffering",
      "pain",
      "emotional pain",
      "temporary",
      "patience",
      "resilience",
    ],
  }),
  verse({
    id: "2.20",
    chapter: 2,
    verse: "20",
    title: "The deepest self is not destroyed",
    sanskrit:
      "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
    transliteration:
      "na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yaṁ purāṇo na hanyate hanyamāne śarīre ||",
    meaning:
      "The deepest self is not born in the ordinary sense and is not destroyed when the body is destroyed. It is described as enduring beyond the changes of the body.",
    reflection:
      "In grief or fear of loss, the verse offers a spiritual view of continuity. Let it sit beside your feelings rather than asking it to hurry them away.",
    themes: ["grief", "loss", "fear", "inner self"],
    keywords: [
      "death",
      "dying",
      "grief",
      "mourning",
      "loss",
      "fear of death",
      "immortality",
      "soul",
      "bereavement",
    ],
  }),
  verse({
    id: "2.22",
    chapter: 2,
    verse: "22",
    title: "Change of form does not end the journey",
    sanskrit:
      "वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥",
    transliteration:
      "vāsāṁsi jīrṇāni yathā vihāya\nnavāni gṛhṇāti naro 'parāṇi |\ntathā śarīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī ||",
    meaning:
      "As a person sets aside worn-out clothes and takes up new ones, the embodied self is described as moving on from an old form to another.",
    reflection:
      "When you are saying goodbye to an old identity, role, or season, this image can make room for renewal without denying what came before.",
    themes: ["renewal", "change", "loss", "new beginnings"],
    keywords: [
      "starting over",
      "new beginning",
      "moving on",
      "reinvention",
      "old identity",
      "fresh start",
      "change clothes",
    ],
  }),
  verse({
    id: "2.38",
    chapter: 2,
    verse: "38",
    title: "Meet gain and loss with steadiness",
    sanskrit:
      "सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ।\nततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि॥",
    transliteration:
      "sukha-duḥkhe same kṛtvā lābhālābhau jayājayau |\ntato yuddhāya yujyasva naivaṁ pāpam avāpsyasi ||",
    meaning:
      "Hold pleasure and pain, gain and loss, victory and defeat in a wider balance. Then act with care, without letting the result alone decide your integrity.",
    reflection:
      "Before a high-stakes choice, this verse separates the quality of your action from the scoreboard you cannot fully control.",
    themes: ["equanimity", "decisions", "success", "failure"],
    keywords: [
      "winning",
      "losing",
      "success",
      "failure",
      "competition",
      "high stakes",
      "decision",
      "balanced",
      "outcome",
    ],
  }),
  verse({
    id: "2.47",
    chapter: 2,
    verse: "47",
    title: "Your work is yours; the outcome is not",
    sanskrit:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration:
      "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
    meaning:
      "Your freedom is in the action you can take, not in owning its final fruit. Do not make the result your identity, and do not let uncertainty about results pull you into inaction.",
    reflection:
      "When you are spiraling about an exam, application, conversation, or decision, ask: what is the next honest action that is actually in my hands?",
    themes: ["worry", "work", "control", "detachment"],
    keywords: [
      "worry about results",
      "outcome",
      "career",
      "exam",
      "work",
      "performance",
      "control",
      "effort",
      "procrastination",
      "fear of failure",
    ],
  }),
  verse({
    id: "2.48",
    chapter: 2,
    verse: "48",
    title: "Act from balance, not attachment",
    sanskrit:
      "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
    transliteration:
      "yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya |\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate ||",
    meaning:
      "Established in inner balance, do what needs to be done without clinging to success or failure. This evenness is called yoga.",
    reflection:
      "You do not have to feel perfectly confident before acting. A steadier center can be the place from which you begin.",
    themes: ["balance", "action", "confidence", "performance"],
    keywords: [
      "nervous",
      "confidence",
      "presentation",
      "interview",
      "success",
      "failure",
      "balance",
      "calm action",
      "pressure",
    ],
  }),
  verse({
    id: "2.50",
    chapter: 2,
    verse: "50",
    title: "Wisdom makes action skillful",
    sanskrit:
      "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥",
    transliteration:
      "buddhi-yukto jahātīha ubhe sukṛta-duṣkṛte |\ntasmād yogāya yujyasva yogaḥ karmasu kauśalam ||",
    meaning:
      "When action is guided by clear understanding, one moves beyond the trap of merely labeling every result as good or bad. Yoga is care and skill in action.",
    reflection:
      "If you are caught between perfectionism and carelessness, return to the quality of the next step: attentive, thoughtful, and appropriate to the moment.",
    themes: ["skill", "clarity", "perfectionism", "action"],
    keywords: [
      "perfectionist",
      "mistakes",
      "skill",
      "better decision",
      "clarity",
      "doing things well",
      "overthinking work",
      "judgment",
    ],
  }),
  verse({
    id: "2.56",
    chapter: 2,
    verse: "56",
    title: "A steady mind is not numb",
    sanskrit:
      "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥",
    transliteration:
      "duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ |\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate ||",
    meaning:
      "One of steady understanding is not thrown into panic by pain or pulled into grasping by pleasure; attachment, fear, and anger no longer rule the mind.",
    reflection:
      "Steadiness is not the absence of feeling. It is the growing ability to feel deeply without handing every impulse the steering wheel.",
    themes: ["emotions", "anger", "fear", "steadiness"],
    keywords: [
      "emotional",
      "panic",
      "anger",
      "fear",
      "reactive",
      "overreacting",
      "calm mind",
      "steady",
      "impulse",
    ],
  }),
  verse({
    id: "2.62-63",
    chapter: 2,
    verse: "62–63",
    title: "Notice the chain before anger takes over",
    sanskrit:
      "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥\n\nक्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
    transliteration:
      "dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate |\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho 'bhijāyate ||\n\nkrodhād bhavati sammohaḥ sammohāt smṛti-vibhramaḥ |\nsmṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati ||",
    meaning:
      "Dwelling repeatedly on an object can become attachment; attachment can become craving, then anger. Anger clouds memory and judgment, creating a chain that can carry us away from ourselves.",
    reflection:
      "The invitation is to catch the chain early: notice the thought you keep feeding, before it turns into a demand, a reaction, or a message you may regret.",
    themes: ["anger", "craving", "rumination", "self-awareness"],
    keywords: [
      "rage",
      "resentment",
      "jealousy",
      "obsessing",
      "ruminating",
      "doomscrolling",
      "impulsive message",
      "argument",
      "anger management",
    ],
  }),
  verse({
    id: "2.70",
    chapter: 2,
    verse: "70",
    title: "Be like the ocean, not every wave",
    sanskrit:
      "आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे स शान्तिमाप्नोति न कामकामी॥",
    transliteration:
      "āpūryamāṇam acala-pratiṣṭhaṁ samudram āpaḥ praviśanti yadvat |\ntadvat kāmā yaṁ praviśanti sarve sa śāntim āpnoti na kāma-kāmī ||",
    meaning:
      "Rivers continually enter the full, unmoving ocean, yet the ocean remains itself. In the same way, peace belongs to the person who can receive desires without being defined by every one of them.",
    reflection:
      "A desire can be real without being a command. Let it arrive, name it, and decide whether it deserves your energy.",
    themes: ["desire", "contentment", "peace", "boundaries"],
    keywords: [
      "wanting more",
      "consumerism",
      "phone addiction",
      "desire",
      "craving",
      "contentment",
      "peace",
      "comparison",
      "restless",
    ],
  }),
  verse({
    id: "3.5",
    chapter: 3,
    verse: "5",
    title: "Energy will move; choose its direction",
    sanskrit:
      "न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्।\nकार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः॥",
    transliteration:
      "na hi kaścit kṣaṇam api jātu tiṣṭhaty akarma-kṛt |\nkāryate hy avaśaḥ karma sarvaḥ prakṛti-jair guṇaiḥ ||",
    meaning:
      "No one can remain completely inactive, even for a moment. The qualities of nature keep everyone moving; the wiser question is how that energy will be directed.",
    reflection:
      "When you feel stuck, begin with one small, deliberate movement instead of waiting for a perfect burst of motivation.",
    themes: ["motivation", "action", "stuck", "momentum"],
    keywords: [
      "stuck",
      "unmotivated",
      "procrastination",
      "lazy",
      "momentum",
      "action",
      "motivation",
      "cannot start",
      "inertia",
    ],
  }),
  verse({
    id: "3.19",
    chapter: 3,
    verse: "19",
    title: "Do the work without clinging",
    sanskrit:
      "तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन् कर्म परं आप्नोति पूरुषः॥",
    transliteration:
      "tasmād asaktaḥ satataṁ kāryaṁ karma samācara |\nasakto hy ācaran karma param āpnoti pūruṣaḥ ||",
    meaning:
      "Therefore keep doing the work that is yours to do, without clinging to it. Action carried out without possessiveness can become a path toward something higher.",
    reflection:
      "You can care about your work and still release the need to squeeze your worth out of its result.",
    themes: ["duty", "work", "detachment", "purpose"],
    keywords: [
      "work stress",
      "responsibility",
      "duty",
      "burnout",
      "purpose",
      "career",
      "keep going",
      "attachment",
    ],
  }),
  verse({
    id: "3.30",
    chapter: 3,
    verse: "30",
    title: "Release the fever around your task",
    sanskrit:
      "मयि सर्वाणि कर्माणि संन्यस्याध्यात्मचेतसा।\nनिराशीर्निर्ममो भूत्वा युध्यस्व विगतज्वरः॥",
    transliteration:
      "mayi sarvāṇi karmāṇi sannyasyādhyātma-cetasā |\nnirāśīr nirmamo bhūtvā yudhyasva vigata-jvaraḥ ||",
    meaning:
      "Offer your actions to the highest understanding you can hold. Let go of anxious expectation and possessiveness, then meet your responsibility without the fever of self-concern.",
    reflection:
      "Before a difficult task, try setting down the question ‘What will this say about me?’ and return to what the moment is asking you to do.",
    themes: ["anxiety", "responsibility", "service", "focus"],
    keywords: [
      "anxious task",
      "pressure",
      "deadline",
      "self doubt",
      "fear of judgment",
      "responsibility",
      "focus",
      "overwhelmed at work",
    ],
  }),
  verse({
    id: "3.35",
    chapter: 3,
    verse: "35",
    title: "Walk your own path honestly",
    sanskrit:
      "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥",
    transliteration:
      "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt |\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||",
    meaning:
      "It is better to live your own calling imperfectly than to perform another person’s path flawlessly. Someone else’s road can look impressive and still be frighteningly misaligned.",
    reflection:
      "Comparison can make another life seem like an instruction. This verse asks what is genuinely yours to learn, build, or serve.",
    themes: ["comparison", "calling", "authenticity", "career"],
    keywords: [
      "comparison",
      "jealous",
      "peer pressure",
      "career choice",
      "purpose",
      "authentic",
      "parents expectations",
      "other peoples lives",
      "social media",
    ],
  }),
  verse({
    id: "4.7-8",
    chapter: 4,
    verse: "7–8",
    title: "When balance is lost, renewal becomes possible",
    sanskrit:
      "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥\n\nपरित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
    transliteration:
      "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||\n\nparitrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām |\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge ||",
    meaning:
      "Whenever right order and care are overwhelmed by harm, a restoring force is said to arise. Renewal returns again and again to protect what is good and re-establish balance.",
    reflection:
      "When the world or your inner life feels badly out of alignment, do not mistake the present imbalance for the final word. Restoration can begin in small acts of courage.",
    themes: ["hope", "justice", "renewal", "courage"],
    keywords: [
      "hopeless",
      "injustice",
      "toxic environment",
      "corruption",
      "world feels wrong",
      "hope",
      "courage",
      "restore balance",
      "hard times",
    ],
  }),
  verse({
    id: "4.11",
    chapter: 4,
    verse: "11",
    title: "Many sincere paths can lead toward the same truth",
    sanskrit:
      "ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम्।\nमम वर्त्मानुवर्तन्ते मनुष्याः पार्थ सर्वशः॥",
    transliteration:
      "ye yathā māṁ prapadyante tāṁs tathaiva bhajāmy aham |\nmama vartmānuvartante manuṣyāḥ pārtha sarvaśaḥ ||",
    meaning:
      "In whatever way people sincerely approach the divine, they are met in that way. All people move along a path toward the truth, each according to their way of approaching it.",
    reflection:
      "This verse can soften the urge to make another person’s spiritual language, practice, or pace look exactly like your own.",
    themes: ["faith", "pluralism", "belonging", "acceptance"],
    keywords: [
      "different beliefs",
      "religion",
      "spiritual doubt",
      "belonging",
      "acceptance",
      "faith",
      "spiritual path",
      "judging others",
    ],
  }),
  verse({
    id: "4.38",
    chapter: 4,
    verse: "38",
    title: "Understanding clears what confusion covers",
    sanskrit:
      "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
    transliteration:
      "na hi jñānena sadṛśaṁ pavitram iha vidyate |\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati ||",
    meaning:
      "Nothing here is said to purify like understanding. Through a life of practice, a person discovers that clarity within themselves over time.",
    reflection:
      "You may not need one more opinion. Sometimes patient learning and direct observation slowly turn a foggy experience into something you can meet clearly.",
    themes: ["learning", "clarity", "confusion", "growth"],
    keywords: [
      "confused",
      "learn",
      "wisdom",
      "clarity",
      "understanding",
      "study",
      "knowledge",
      "growth",
      "uncertain",
    ],
  }),
  verse({
    id: "5.10",
    chapter: 5,
    verse: "10",
    title: "Let action touch you without defining you",
    sanskrit:
      "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥",
    transliteration:
      "brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padma-patram ivāmbhasā ||",
    meaning:
      "One who offers action to the highest and releases attachment is compared to a lotus leaf untouched by water. Experience may touch you without becoming the whole of you.",
    reflection:
      "A mistake, criticism, or difficult role can be something you went through—not the final definition of the person you are.",
    themes: ["guilt", "identity", "mistakes", "detachment"],
    keywords: [
      "guilt",
      "shame",
      "mistake",
      "criticism",
      "work identity",
      "not good enough",
      "embarrassed",
      "detachment",
      "lotus",
    ],
  }),
  verse({
    id: "5.18",
    chapter: 5,
    verse: "18",
    title: "See the same worth through different forms",
    sanskrit:
      "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि।\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः॥",
    transliteration:
      "vidyā-vinaya-sampanne brāhmaṇe gavi hastini |\nśuni caiva śva-pāke ca paṇḍitāḥ sama-darśinaḥ ||",
    meaning:
      "A wise person sees with an even regard in a learned human, an animal, and one whom society looks down upon. Wisdom looks past status to the shared presence of life.",
    reflection:
      "When status, labels, or first impressions dominate a room, this verse asks you to practice a wider and more equal gaze—including toward yourself.",
    themes: ["equality", "compassion", "prejudice", "self-worth"],
    keywords: [
      "judgment",
      "prejudice",
      "status",
      "self worth",
      "inferior",
      "superior",
      "equality",
      "compassion",
      "discrimination",
    ],
  }),
  verse({
    id: "6.5",
    chapter: 6,
    verse: "5",
    title: "Lift yourself with the self",
    sanskrit:
      "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration:
      "uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||",
    meaning:
      "Let the self raise itself; do not push yourself down. Your own mind can become your friend, and it can also turn into an enemy when it works against you.",
    reflection:
      "Self-discipline here does not have to mean self-punishment. Start by speaking to yourself in a way that makes the next good action more possible.",
    themes: ["self-talk", "depression", "agency", "self-compassion"],
    keywords: [
      "negative self talk",
      "self sabotage",
      "depressed",
      "low mood",
      "self esteem",
      "confidence",
      "help myself",
      "agency",
      "inner critic",
    ],
  }),
  verse({
    id: "6.6",
    chapter: 6,
    verse: "6",
    title: "Train the mind to become an ally",
    sanskrit:
      "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।\nअनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत्॥",
    transliteration:
      "bandhur ātmātmanas tasya yenātmaivātmanā jitaḥ |\nanātmanas tu śatrutve vartetātmaiva śatru-vat ||",
    meaning:
      "For one who has learned to guide the mind, the mind becomes a friend. For one who has not, that same mind can behave like an adversary.",
    reflection:
      "A difficult mind is not a fixed verdict. Repeated small practices can change the relationship you have with your thoughts.",
    themes: ["mind", "habits", "self-mastery", "thoughts"],
    keywords: [
      "intrusive thoughts",
      "mind racing",
      "bad habits",
      "self control",
      "discipline",
      "thoughts",
      "mind is enemy",
      "habit change",
    ],
  }),
  verse({
    id: "6.17",
    chapter: 6,
    verse: "17",
    title: "A balanced life supports a balanced mind",
    sanskrit:
      "युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु।\nयुक्तस्वप्नावबोधस्य योगो भवति दुःखहा॥",
    transliteration:
      "yuktāhāra-vihārasya yukta-ceṣṭasya karmasu |\nyukta-svapnāvabodhasya yogo bhavati duḥkha-hā ||",
    meaning:
      "For one whose eating, recreation, effort, sleep, and waking are balanced, practice becomes a way of easing suffering.",
    reflection:
      "Before asking your mind to solve everything, look gently at the foundations that hold it: rest, nourishment, movement, work, and pauses.",
    themes: ["balance", "sleep", "burnout", "wellbeing"],
    keywords: [
      "sleep",
      "burnout",
      "work life balance",
      "tired",
      "exhausted",
      "routine",
      "healthy habits",
      "rest",
      "overwork",
    ],
  }),
  verse({
    id: "6.26",
    chapter: 6,
    verse: "26",
    title: "Return the wandering mind gently",
    sanskrit:
      "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत्॥",
    transliteration:
      "yato yato niścarati manaś cañcalam asthiram |\ntatas tato niyamyaitad ātmany eva vaśaṁ nayet ||",
    meaning:
      "Whenever the restless, unsteady mind wanders away, bring it back, again and again, into your care and awareness.",
    reflection:
      "The practice is not never wandering. It is noticing sooner and returning without turning the return into another reason to be harsh with yourself.",
    themes: ["focus", "meditation", "distraction", "self-compassion"],
    keywords: [
      "distracted",
      "focus",
      "meditation",
      "phone",
      "attention",
      "mind wandering",
      "anxiety thoughts",
      "cannot concentrate",
      "return",
    ],
  }),
  verse({
    id: "6.35",
    chapter: 6,
    verse: "35",
    title: "Practice and letting go steady the mind",
    sanskrit:
      "असंशयं महाबाहो मनो दुर्निग्रहं चलम्।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥",
    transliteration:
      "asaṁśayaṁ mahā-bāho mano durnigrahaṁ calam |\nabhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||",
    meaning:
      "The mind is certainly restless and difficult to hold. Yet it can be steadied through practice and through releasing the grip of attachment.",
    reflection:
      "You are not failing because your mind wanders. Consistent practice and a little less grasping are both part of the path.",
    themes: ["anxiety", "practice", "meditation", "habits"],
    keywords: [
      "restless",
      "anxious mind",
      "overthinking",
      "practice",
      "meditation",
      "letting go",
      "attachment",
      "patience with self",
    ],
  }),
  verse({
    id: "8.7",
    chapter: 8,
    verse: "7",
    title: "Remember what matters while you act",
    sanskrit:
      "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च।\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम्॥",
    transliteration:
      "tasmāt sarveṣu kāleṣu mām anusmara yudhya ca |\nmayy arpita-mano-buddhir mām evaiṣyasy asaṁśayam ||",
    meaning:
      "Remember the highest truth while meeting the work of the moment. Let both inner orientation and outward responsibility belong together.",
    reflection:
      "Spiritual practice does not have to wait for life to become quiet. A brief remembrance can travel with you into the meeting, commute, or difficult conversation.",
    themes: ["purpose", "presence", "devotion", "responsibility"],
    keywords: [
      "busy",
      "spiritual practice",
      "work and faith",
      "purpose",
      "presence",
      "daily life",
      "remember",
      "balance spirituality",
    ],
  }),
  verse({
    id: "9.22",
    chapter: 9,
    verse: "22",
    title: "Trust can be a practice of care",
    sanskrit:
      "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    transliteration:
      "ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||",
    meaning:
      "Those who hold an undivided devotion are promised support in what they need and care for what they have. The verse speaks of trustful relationship rather than solitary control.",
    reflection:
      "When uncertainty makes you believe everything depends on your grip, consider what it would mean to do your part and allow support to reach you.",
    themes: ["trust", "faith", "security", "surrender"],
    keywords: [
      "financial worry",
      "security",
      "uncertain future",
      "trust",
      "faith",
      "support",
      "letting god",
      "surrender",
      "alone",
    ],
  }),
  verse({
    id: "9.27",
    chapter: 9,
    verse: "27",
    title: "Make an offering of ordinary life",
    sanskrit:
      "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥",
    transliteration:
      "yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat |\nyat tapasyasi kaunteya tat kuruṣva mad-arpaṇam ||",
    meaning:
      "Whatever you do, eat, offer, give, or practice, let it become an offering to the divine. The sacred is not limited to extraordinary moments.",
    reflection:
      "A meal, email, chore, or act of care can become meaningful when you bring intention to it instead of dividing life into spiritual and non-spiritual parts.",
    themes: ["meaning", "daily life", "service", "devotion"],
    keywords: [
      "meaningless",
      "ordinary life",
      "daily routine",
      "purpose",
      "service",
      "devotion",
      "chores",
      "intention",
      "sacred",
    ],
  }),
  verse({
    id: "10.20",
    chapter: 10,
    verse: "20",
    title: "The sacred is present within every heart",
    sanskrit:
      "अहमात्मा गुडाकेश सर्वभूताशयस्थितः।\nअहमादिश्च मध्यं च भूतानामन्त एव च॥",
    transliteration:
      "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ |\naham ādiś ca madhyaṁ ca bhūtānām anta eva ca ||",
    meaning:
      "The divine speaks as the inner self dwelling in the heart of every being, present at the beginning, middle, and end of life.",
    reflection:
      "If you feel cut off from meaning, begin close to home: this breath, this heart, this living moment, and the lives around you.",
    themes: ["connection", "belonging", "presence", "divinity"],
    keywords: [
      "lonely",
      "alone",
      "disconnected",
      "meaning",
      "god within",
      "connection",
      "belonging",
      "heart",
      "spiritual comfort",
    ],
  }),
  verse({
    id: "11.33",
    chapter: 11,
    verse: "33",
    title: "You can be an instrument of what is right",
    sanskrit:
      "तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम्।\nमयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन्॥",
    transliteration:
      "tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṁ samṛddham |\nmayaivaite nihatāḥ pūrvam eva nimitta-mātraṁ bhava savya-sācin ||",
    meaning:
      "Rise and take part in the work before you. You need not imagine yourself as the sole author of the whole outcome; become an instrument for what is worthy.",
    reflection:
      "This can loosen the burden of believing you must control everything. Your sincere participation matters, even when the whole pattern is larger than you.",
    themes: ["courage", "action", "purpose", "control"],
    keywords: [
      "fear to act",
      "leadership",
      "big responsibility",
      "control",
      "courage",
      "instrument",
      "take action",
      "overwhelmed by responsibility",
    ],
  }),
  verse({
    id: "12.6-7",
    chapter: 12,
    verse: "6–7",
    title: "A devoted heart is not left alone",
    sanskrit:
      "ये तु सर्वाणि कर्माणि मयि संन्यस्य मत्पराः।\nअनन्येनैव योगेन मां ध्यायन्त उपासते॥\n\nतेषामहं समुद्धर्ता मृत्युसंसारसागरात्।\nभवामि न चिरात्पार्थ मय्यावेशितचेतसाम्॥",
    transliteration:
      "ye tu sarvāṇi karmāṇi mayi sannyasya mat-parāḥ |\nananyenaiva yogena māṁ dhyāyanta upāsate ||\n\nteṣām ahaṁ samuddhartā mṛtyu-saṁsāra-sāgarāt |\nbhavāmi na cirāt pārtha mayy āveśita-cetasām ||",
    meaning:
      "Those who offer their actions to the divine and keep their heart turned toward it are promised a crossing through the ocean of fear and repeated struggle.",
    reflection:
      "If the path feels too large to cross alone, let devotion mean allowing relationship, ritual, community, or prayer to carry some of the weight.",
    themes: ["devotion", "support", "fear", "surrender"],
    keywords: [
      "overwhelmed",
      "spiritual support",
      "prayer",
      "faith",
      "fear",
      "alone in struggle",
      "devotion",
      "community",
    ],
  }),
  verse({
    id: "12.13-14",
    chapter: 12,
    verse: "13–14",
    title: "Practice a gentler strength",
    sanskrit:
      "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥\n\nसन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥",
    transliteration:
      "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||\n\nsantuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ |\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ ||",
    meaning:
      "The dear devotee is friendly and compassionate, free from possessiveness and ego, steady through pleasure and pain, forgiving, content, self-guided, and firm in purpose.",
    reflection:
      "Strength does not have to look hard. This verse describes a strength that can be compassionate, forgiving, and steady at the same time.",
    themes: ["compassion", "forgiveness", "kindness", "strength"],
    keywords: [
      "hurt someone",
      "forgive",
      "compassion",
      "kindness",
      "resentment",
      "ego",
      "self control",
      "gentle strength",
      "peaceful",
    ],
  }),
  verse({
    id: "12.15",
    chapter: 12,
    verse: "15",
    title: "Do not be shaken by every reaction",
    sanskrit:
      "यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥",
    transliteration:
      "yasmān nodvijate loko lokān nodvijate ca yaḥ |\nharṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ ||",
    meaning:
      "One who does not agitate the world, and is not constantly agitated by the world, who is free from the swings of elation, resentment, fear, and anxiety, is held dear.",
    reflection:
      "You cannot prevent every person’s reaction. You can practice becoming less governed by applause, outrage, fear, or the need to answer everything immediately.",
    themes: ["boundaries", "criticism", "fear", "composure"],
    keywords: [
      "people pleasing",
      "criticism",
      "online comments",
      "social anxiety",
      "fear of judgment",
      "reaction",
      "conflict",
      "boundaries",
      "approval",
    ],
  }),
  verse({
    id: "12.18-19",
    chapter: 12,
    verse: "18–19",
    title: "Keep an even heart with friend and critic",
    sanskrit:
      "समः शत्रौ च मित्रे च तथा मानापमानयोः।\nशीतोष्णसुखदुःखेषु समः सङ्गविवर्जितः॥\n\nतुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित्।\nअनिकेतः स्थिरमतिर्भक्तिमान्मे प्रियो नरः॥",
    transliteration:
      "samaḥ śatrau ca mitre ca tathā mānāpamānayoḥ |\nśītoṣṇa-sukha-duḥkheṣu samaḥ saṅga-vivarjitaḥ ||\n\ntulya-nindā-stutir maunī santuṣṭo yena kenacit |\naniketaḥ sthira-matir bhaktimān me priyo naraḥ ||",
    meaning:
      "One who remains even toward friend and enemy, honor and insult, pleasure and pain, praise and blame, and who is inwardly steady is held dear.",
    reflection:
      "This is not a call to accept mistreatment. It is a reminder that another person’s praise or insult does not need to become the measure of your inner worth.",
    themes: ["criticism", "praise", "self-worth", "equanimity"],
    keywords: [
      "insulted",
      "criticized",
      "praise",
      "reputation",
      "friend enemy",
      "approval",
      "rejection",
      "self worth",
      "social pressure",
    ],
  }),
  verse({
    id: "14.22-25",
    chapter: 14,
    verse: "22–25",
    title: "Observe the qualities without becoming them",
    sanskrit:
      "प्रकाशं च प्रवृत्तिं च मोहमेव च पाण्डव।\nन द्वेष्टि सम्प्रवृत्तानि न निवृत्तानि काङ्क्षति॥\n\nउदासीनवदासीनो गुणैर्यो न विचाल्यते।\nगुणा वर्तन्त इत्येवं योऽवतिष्ठति नेङ्गते॥\n\nसमदुःखसुखः स्वस्थः समलोष्टाश्मकाञ्चनः।\nतुल्यप्रियाप्रियो धीरस्तुल्यनिन्दात्मसंस्तुतिः॥\n\nमानापमानयोस्तुल्योस्तुल्यो मित्रारिपक्षयोः।\nसर्वारम्भपरित्यागी गुणातीतः स उच्यते॥",
    transliteration:
      "prakāśaṁ ca pravṛttiṁ ca moham eva ca pāṇḍava |\nna dveṣṭi sampravṛttāni na nivṛttāni kāṅkṣati ||\n\nudāsīna-vad āsīno guṇair yo na vicālyate |\nguṇā vartanta ity evaṁ yo 'vatiṣṭhati neṅgate ||\n\nsama-duḥkha-sukhaḥ svasthaḥ sama-loṣṭāśma-kāñcanaḥ |\ntulya-priyāpriyo dhīras tulya-nindātma-saṁstutiḥ ||\n\nmānāpamānayos tulyas tulyo mitrāri-pakṣayoḥ |\nsarvārambha-parityāgī guṇātītaḥ sa ucyate ||",
    meaning:
      "The wise observe clarity, activity, and confusion as passing qualities of nature. They do not hate their arrival or cling to their departure, and remain steady through pleasure, pain, praise, and blame.",
    reflection:
      "A mood, role, or season of high energy is something you are experiencing—not necessarily the whole truth of who you are.",
    themes: ["moods", "awareness", "equanimity", "detachment"],
    keywords: [
      "mood swings",
      "confused",
      "overactive",
      "low energy",
      "observe thoughts",
      "emotions",
      "detached",
      "equanimity",
      "identity",
    ],
  }),
  verse({
    id: "16.1-3",
    chapter: 16,
    verse: "1–3",
    title: "Courage and integrity are inner wealth",
    sanskrit:
      "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥\n\nअहिंसा सत्यमक्रोधस्त्यागः शान्तिरपैशुनम्।\nदया भूतेष्वलोलुप्त्वं मार्दवं ह्रीरचापलम्॥\n\nतेजः क्षमा धृतिः शौचमद्रोहो नातिमानिता।\nभवन्ति सम्पदं दैवीमभिजातस्य भारत॥",
    transliteration:
      "abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṁ damaś ca yajñaś ca svādhyāyas tapa ārjavam ||\n\nahiṁsā satyam akrodhas tyāgaḥ śāntir apaiśunam |\ndayā bhūteṣv aloluptvaṁ mārdavaṁ hrīr acāpalam ||\n\ntejaḥ kṣamā dhṛtiḥ śaucam adroho nātimānitā |\nbhavanti sampadaṁ daivīm abhijātasya bhārata ||",
    meaning:
      "Fearlessness, clarity, self-discipline, study, truthfulness, non-violence, forgiveness, compassion, steadiness, and humility are described as forms of inner wealth.",
    reflection:
      "When you wonder what kind of person to become, this list points away from image and toward qualities that make life safer and more truthful for everyone around you.",
    themes: ["courage", "integrity", "character", "compassion"],
    keywords: [
      "character",
      "integrity",
      "fear",
      "honesty",
      "forgiveness",
      "humility",
      "compassion",
      "be a good person",
      "values",
    ],
  }),
  verse({
    id: "17.16",
    chapter: 17,
    verse: "16",
    title: "A quiet mind is a form of practice",
    sanskrit:
      "मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः।\nभावसंशुद्धिरित्येतत्तपो मानसमुच्यते॥",
    transliteration:
      "manaḥ-prasādaḥ saumyatvaṁ maunam ātma-vinigrahaḥ |\nbhāva-saṁśuddhir ity etat tapo mānasam ucyate ||",
    meaning:
      "Cheerfulness of mind, gentleness, measured speech, self-guidance, and sincerity of feeling are called disciplines of the mind.",
    reflection:
      "Mental practice is not only intense concentration. It can be the quiet work of softening your inner tone and choosing words that do less harm.",
    themes: ["peace", "speech", "self-care", "mind"],
    keywords: [
      "peaceful mind",
      "harsh thoughts",
      "quiet",
      "gentleness",
      "self care",
      "inner peace",
      "calm",
      "how to speak",
      "mental health",
    ],
  }),
  verse({
    id: "18.46",
    chapter: 18,
    verse: "46",
    title: "Meaning can be found through your own work",
    sanskrit:
      "यतः प्रवृत्तिर्भूतानां येन सर्वमिदं ततम्।\nस्वकर्मणा तमभ्यर्च्य सिद्धिं विन्दति मानवः॥",
    transliteration:
      "yataḥ pravṛttir bhūtānāṁ yena sarvam idaṁ tatam |\nsvakarmaṇā tam abhyarcya siddhiṁ vindati mānavaḥ ||",
    meaning:
      "The source from which all beings arise and by which all this is pervaded can be honored through one’s own work. A person can find fulfillment by doing their part as an offering.",
    reflection:
      "Your work does not have to look extraordinary to be meaningful. Attention and care can turn an ordinary responsibility into a form of service.",
    themes: ["purpose", "work", "service", "fulfillment"],
    keywords: [
      "purpose in work",
      "career meaning",
      "fulfillment",
      "job",
      "service",
      "calling",
      "meaningful work",
      "ordinary work",
    ],
  }),
  verse({
    id: "18.48",
    chapter: 18,
    verse: "48",
    title: "Do not abandon your path because it is imperfect",
    sanskrit:
      "सहजं कर्म कौन्तेय सदोषमपि न त्यजेत्।\nसर्वारम्भा हि दोषेण धूमेनाग्निरिवावृताः॥",
    transliteration:
      "saha-jaṁ karma kaunteya sa-doṣam api na tyajet |\nsarvārambhā hi doṣeṇa dhūmenāgnir ivāvṛtāḥ ||",
    meaning:
      "Do not abandon the work that belongs to you merely because it has flaws. Every beginning is covered by some imperfection, just as fire is veiled by smoke.",
    reflection:
      "A meaningful path can still be messy. Let imperfection be information for improvement, not automatic proof that you chose the wrong road.",
    themes: ["perfectionism", "persistence", "career", "doubt"],
    keywords: [
      "give up",
      "imperfect",
      "perfectionism",
      "quit",
      "career doubt",
      "mistakes",
      "persistence",
      "not good enough",
      "starting something",
    ],
  }),
  verse({
    id: "18.57",
    chapter: 18,
    verse: "57",
    title: "Offer the action, keep the mind clear",
    sanskrit:
      "चेतसा सर्वकर्माणि मयि संन्यस्य मत्परः।\nबुद्धियोगमुपाश्रित्य मच्चित्तः सततं भव॥",
    transliteration:
      "cetasā sarva-karmāṇi mayi sannyasya mat-paraḥ |\nbuddhi-yogam upāśritya mac-cittaḥ satataṁ bhava ||",
    meaning:
      "Offer all your actions inwardly to the highest, take refuge in clear understanding, and keep your attention turned toward that center.",
    reflection:
      "Before acting, you can pause long enough to choose the value you want the action to express. That pause is already a form of freedom.",
    themes: ["decisions", "clarity", "values", "focus"],
    keywords: [
      "hard decision",
      "what should I do",
      "values",
      "clarity",
      "choice",
      "focus",
      "purpose",
      "decision making",
      "uncertain",
    ],
  }),
  verse({
    id: "18.63",
    chapter: 18,
    verse: "63",
    title: "Reflect deeply, then choose",
    sanskrit:
      "इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया।\nविमृश्यैतदशेषेण यथेच्छसि तथा कुरु॥",
    transliteration:
      "iti te jñānam ākhyātaṁ guhyād guhya-taraṁ mayā |\nvimṛśyaitad aśeṣeṇa yathecchasi tathā kuru ||",
    meaning:
      "After sharing this deep teaching, Krishna asks Arjuna to examine it fully and then act as he chooses. Understanding should lead to conscious choice, not blind obedience.",
    reflection:
      "Wisdom can be offered without taking away your agency. Take time to reflect, listen inwardly, and make the choice you can stand behind.",
    themes: ["decisions", "agency", "discernment", "freedom"],
    keywords: [
      "decision",
      "choice",
      "should I",
      "agency",
      "free will",
      "advice",
      "confused what to do",
      "discernment",
      "life choice",
    ],
  }),
  verse({
    id: "18.66",
    chapter: 18,
    verse: "66",
    title: "Surrender fear into a larger refuge",
    sanskrit:
      "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    transliteration:
      "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||",
    meaning:
      "Release the burden of trying to solve everything through separate rules and take refuge in the highest truth. Do not be consumed by sorrow; trust that liberation is possible.",
    reflection:
      "Surrender is not giving up on life. It can mean loosening the grip of guilt and fear long enough to receive grace, help, or a new beginning.",
    themes: ["surrender", "guilt", "fear", "grace"],
    keywords: [
      "guilt",
      "fear",
      "surrender",
      "forgive myself",
      "spiritual crisis",
      "hopeless",
      "grace",
      "sorrow",
      "let go",
    ],
  }),
];

export const CHAPTER_TITLES: Record<number, string> = {
  2: "Sāṅkhya Yoga",
  3: "Karma Yoga",
  4: "Jñāna Karma Sannyāsa Yoga",
  5: "Karma Sannyāsa Yoga",
  6: "Dhyāna Yoga",
  8: "Akṣara Brahma Yoga",
  9: "Rāja Vidyā Rāja Guhya Yoga",
  10: "Vibhūti Yoga",
  11: "Viśvarūpa Darśana Yoga",
  12: "Bhakti Yoga",
  14: "Guṇa Traya Vibhāga Yoga",
  16: "Daivāsura Sampad Vibhāga Yoga",
  17: "Śraddhā Traya Vibhāga Yoga",
  18: "Mokṣa Sannyāsa Yoga",
};
