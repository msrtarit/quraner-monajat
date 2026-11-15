import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Languages,
  Play, Pause, SkipBack, SkipForward, Repeat, Volume2, VolumeX,
  BookOpen, Sparkles, Heart, Search, Moon, Sun, Settings, Check,
  Bookmark, RotateCcw, ChevronRight, ChevronDown, Info, Download,
  Compass, Shield, Award, ListMusic, Menu, X, ExternalLink, Copy, ShoppingBag
} from 'lucide-react';

/**
 * ============================================================================
 * DATA STRUCTURE: COMPLETE CHAPTERS & VERSES FROM "কোরআনের মোনাজাত এবং হাম্দ"
 * Compiled by S.M. Zakir Hussain
 * ============================================================================
 */

const RECITERS = [
  {
    id: 'Abdul_Basit_Murattal_192kbps',
    name: 'Abdul Basit Abdul Samad (Murattal)',
    bnName: 'ক্বারী আব্দুল বাসিত (মুরাত্তাল)',
    quality: '192 kbps • Clear & Measured'
  },
  {
    id: 'Abdul_Basit_Mujawwad_128kbps',
    name: 'Abdul Basit Abdul Samad (Mujawwad)',
    bnName: 'ক্বারী আব্দুল বাসিত (মুজাওয়াদ)',
    quality: '128 kbps • Melodic & Slow'
  },
  {
    id: 'Alafasy_128kbps',
    name: 'Mishary Rashid Alafasy',
    bnName: 'মিশারি রশিদ আল-আফাসি',
    quality: '128 kbps • Soulful'
  },
  {
    id: 'Husary_128kbps',
    name: 'Mahmoud Khalil Al-Husary',
    bnName: 'মাহমুদ খলিল আল-হুসারি',
    quality: '128 kbps • Tajweed Standard'
  },
  {
    id: 'Minshawy_Murattal_128kbps',
    name: 'Mohamed Siddiq El-Minshawi',
    bnName: 'মুহাম্মদ সিদ্দিক আল-মিনশাবি',
    quality: '128 kbps • Reverent'
  }
];

const CHAPTERS = [
  {
    id: 'intro',
    number: '০',
    numberEn: '0',
    titleBn: 'ভূমিকা ও উচ্চারণ নির্দেশিকা',
    titleEn: 'Preface & Pronunciation Guide',
    subtitleBn: 'সংকলক: এস. এম. জাকির হুসাইন',
    subtitleEn: 'Compiler: S.M. Zakir Hussain',
    countLabel: 'নির্দেশিকা',
    countLabelEn: 'Guide'
  },
  {
    id: 'monajat',
    number: '১',
    numberEn: '1',
    titleBn: 'আল-কোরআনের ২৭টি মোনাজাত',
    titleEn: '27 Quranic Supplications (Monajat)',
    subtitleBn: 'রোগ-মুক্তি, বিপদমুক্তি, সমৃদ্ধি ও পরকালের মুক্তির কবুল হওয়া দোয়া (পৃষ্ঠা ১–৬৩)',
    subtitleEn: '27 Divine Prayers for Healing, Relief, Prosperity & Salvation',
    countLabel: '২৭টি প্রার্থনা',
    countLabelEn: '27 Prayers'
  },
  {
    id: 'hamd',
    number: '২',
    numberEn: '2',
    titleBn: 'হাম্দ — আল্লাহর প্রশংসা',
    titleEn: 'Hamd — Praises of Allah',
    subtitleBn: 'ঈমান, সুস্বাস্থ্য, সমৃদ্ধি ও অন্তরে প্রশান্তি লাভের শ্রেষ্ঠ আমল (পৃষ্ঠা ৬৫–৯২)',
    subtitleEn: '23 Quranic Verses Glorifying & Praising Allah',
    countLabel: '২৩টি হাম্দ',
    countLabelEn: '23 Praises'
  },
  {
    id: 'amal',
    number: '৩',
    numberEn: '3',
    titleBn: "কিছু গুরুত্বপূর্ণ 'আমল",
    titleEn: "Important Spiritual 'Amals",
    subtitleBn: 'আত্মশুদ্ধি, নফস দমন ও হৃদয়ের প্রশান্তির আয়াতসমূহ (পৃষ্ঠা ৯৩–১০৮)',
    subtitleEn: '13 Key Verses for Self-Purification & Heart Tranquility',
    countLabel: '১৩টি আমল',
    countLabelEn: "13 'Amals"
  },
  {
    id: 'iman_amal',
    number: '৪',
    numberEn: '4',
    titleBn: "ঈমান বৃদ্ধির ১১টি বিশেষ 'আমল",
    titleEn: "11 Special 'Amals for Increasing Faith",
    subtitleBn: 'ঈমান দৃঢ় করার ক্রমিক ১১টি বিশেষ আয়াত ও সিজদাহ (পৃষ্ঠা ১০৯–১১৫)',
    subtitleEn: '11 Numbered Verses for Strengthening Iman (Including Sajdah Verses)',
    countLabel: '১১টি বিশেষ আমল',
    countLabelEn: "11 Special 'Amals"
  }
];


// Comprehensive English translations for all spiritual benefits & notes
const TRANSLATIONS_EN = {
  "monajat-1": {
    "benefitsEn": [
      "Comprehensive worldly well-being (healing from illness, relief from poverty and hardship)",
      "Fosters an Akhirah-oriented mindset, strengthening faith and bringing contentment with modest means",
      "Salvation from the punishment of the Hellfire in the Hereafter"
    ],
    "noteEn": "Allah desires us to keep a humble eye on the Hereafter alongside this world. Because this supplication seeks the best of both realms together, its likelihood of acceptance is exceptionally high."
  },
  "monajat-2": {
    "benefitsEn": [
      "Bestows steadfast patience leading to healing, relief from poverty, and triumph over hardship",
      "Deepens reliance upon Allah (Tawakkul) and fortifies noble moral character",
      "Grants inner fortitude during severe trials of faith and brings closeness to Allah"
    ],
    "noteEn": "Patience cannot be attained without Allah’s aid. This prayer is indispensable both for endurance in distress and moderation in prosperity."
  },
  "monajat-3": {
    "benefitsEn": [
      "Forgiveness for sins committed out of ignorance or error, granting protection from their consequences",
      "Brings deep tranquility to the heart and relieves agonizing guilt",
      "Facilitates ease in daily domestic, social, and financial matters"
    ]
  },
  "monajat-4": {
    "benefitsEn": [
      "Awakens deep consciousness of the Day of Judgment and restrains the base desires of the soul",
      "Increases God-consciousness (Taqwa) and dispels worldly delusions",
      "Enhances complete surrender to Allah, greatly increasing the acceptance of all supplications"
    ],
    "noteEn": "A heart-rending prayer invoking the awe and certainty of the Day of Judgment. It is recommended to recite this before making other supplications."
  },
  "monajat-5": {
    "benefitsEn": [
      "Bestows profound wisdom and perception of the mysteries of creation",
      "Cultivates a grateful and praising heart through pondering Allah’s omnipotence and majesty",
      "Shields from the torment of the Hellfire"
    ],
    "noteEn": "Pondering the heavens and the vast expanse of nature with awe, then supplicating with this prayer alongside Prayer 24, leads to profound divine knowledge."
  },
  "monajat-6": {
    "benefitsEn": [
      "Protection from humiliation, shame, and disgrace on the Day of Resurrection",
      "Keeps one mindful of accountability before Allah and helps preserve righteous conduct",
      "Brings salvation from the ultimate ruin of the wrongdoers"
    ],
    "noteEn": "Prayers 5, 6, 7, and 8 form a continuous, unified supplication revealed in the Quran; reciting them together yields great spiritual reward."
  },
  "monajat-7": {
    "benefitsEn": [
      "Forgiveness of major and minor sins and purification of evil deeds",
      "Grants the blessing of dying in a state of righteousness alongside the noble believers",
      "Directly answers the call of the Messenger of Allah (ﷺ) with resolute faith"
    ],
    "noteEn": "In this prayer, the believer bears witness to the truth of the Prophet’s (ﷺ) call and acknowledges true faith as the means of seeking divine forgiveness."
  },
  "monajat-8": {
    "benefitsEn": [
      "Attainment of the eternal divine promises conveyed through the Messengers of Allah",
      "Freedom from disgrace and regret on the Day of Judgment",
      "Fulfills complete trust in the unfailing promise of Allah"
    ],
    "noteEn": "The highest etiquette in prayer is asking for the very rewards Allah promised through His Prophets, rather than asking purely based on one’s own earthly desires."
  },
  "monajat-9": {
    "benefitsEn": [
      "Forgiveness of sins and protection from arrogance and transgression",
      "Firmness of foot and unwavering fortitude in facing challenges and opposition",
      "Victory, help, and triumph over disbelief and wrongdoing"
    ],
    "noteEn": "This prayer combines the affirmation of Allah’s absolute sovereignty, unconditional submission, and pure praise (Hamd)."
  },
  "monajat-10": {
    "benefitsEn": [
      "Complete forgiveness of self-inflicted wrongs, errors, and shortcomings",
      "Envelops the soul in Allah’s boundless mercy and prevents ultimate spiritual loss",
      "Instills deep humility, sincere remorse, and inner purity"
    ],
    "noteEn": "The profound prayer of repentance uttered by Prophet Adam and Eve (peace be upon them). It is frequently recited within our regular daily prayers."
  },
  "monajat-11": {
    "benefitsEn": [
      "Protection from falling into the companionship, mentality, and punishment of the unjust",
      "Safeguards one’s faith and integrity amidst surrounding corruption and falsehood",
      "Preserves the heart from despair when witnessing oppression"
    ],
    "noteEn": "Righteous companionship brings spiritual elevation, whereas corrupt company brings ruin. On the Day of Resurrection, people are gathered with those they emulate."
  },
  "monajat-12": {
    "benefitsEn": [
      "Shields from asking for things that lead to harm or for which one has no beneficial knowledge",
      "Cleanses the heart from inappropriate desires and spiritual ignorance",
      "Secures Allah’s overarching mercy and protection from ruin"
    ],
    "noteEn": "The prayer of Prophet Nuh (Noah, peace be upon him). Often, having a desire withheld by Allah is the very mercy that protects us, though our limited sight cannot see it."
  },
  "monajat-13": {
    "benefitsEn": [
      "A blessed and peaceful end upon Islam and true faith (Husn al-Khatimah)",
      "Joining the company of the righteous prophets, martyrs, and saints in Paradise",
      "Total surrender to the Lord of the heavens and the earth"
    ],
    "noteEn": "The heartfelt prayer of Prophet Yusuf (Joseph, peace be upon him). Recognizing that the Giver of life is also the Causer of death dissolves spiritual doubt and distance."
  },
  "monajat-14": {
    "benefitsEn": [
      "Forgiveness for oneself, one’s parents, and all believing men and women",
      "Great divine reward and elevation of rank on the Day the Reckoning is established",
      "Strengthens love and spiritual connection with the entire global Ummah"
    ],
    "noteEn": "Reciting this with humility, awe, and submission late at night after the Tahajjud prayer yields extraordinary spiritual openings."
  },
  "monajat-15": {
    "benefitsEn": [
      "Extensive divine mercy and unconditional forgiveness from the Best of the Merciful",
      "Protection from the consequences of human frailty and transgression",
      "Elevates the believer among those blessed with divine compassion"
    ],
    "noteEn": "Because this supplication is centered on the Hereafter and the welfare of all believing servants, it carries immense power."
  },
  "monajat-16": {
    "benefitsEn": [
      "Direct divine mercy and miraculous guidance in bewildering or difficult circumstances",
      "Rectification of one’s affairs and clarity of judgment when paths seem closed",
      "Protection of youth and family from societal corruption"
    ],
    "noteEn": "The prayer of the Youth of the Cave (Ashab al-Kahf). A concise yet complete supplication acknowledging human helplessness and calling upon divine grace."
  },
  "monajat-17": {
    "benefitsEn": [
      "Expands the chest with peace, removing anxiety, fear, and constriction of heart",
      "Makes difficult tasks easy and unties knots of hesitation in speech",
      "Grants eloquence, clarity, and persuasiveness in conveying truth and doing good"
    ],
    "noteEn": "The supplication of Prophet Musa (Moses, peace be upon him). Excellent to recite before reciting the Holy Quran, taking an exam, or addressing people with a good purpose."
  },
  "monajat-18": {
    "benefitsEn": [
      "Blessing of righteous, pious offspring and noble descendants",
      "Acceptance of supplications from the Supreme Hearer of all prayer",
      "Preservation of lineage in faith and virtue"
    ],
    "noteEn": "The prayer of Prophet Zakariyya (Zechariah, peace be upon him). The condition of its blessing is seeking children solely for Allah and with the intention of dedicating them to His path."
  },
  "monajat-19": {
    "benefitsEn": [
      "Protection from all forms of harm, mockery, and whispers of the devils (Shayatin)",
      "Shields the mind and home from demonic presence, intrusive thoughts, and negativity",
      "Brings spiritual calmness and clarity during prayer and daily tasks"
    ],
    "noteEn": "While reciting this supplication, one should bring to mind their specific trials and remain earnest in rectifying any personal shortcomings."
  },
  "monajat-20": {
    "benefitsEn": [
      "Divine mercy and forgiveness that supersede all human sins",
      "Comfort in grief and uplifting of sorrowful hearts",
      "Attaining the favor of Allah who is the Most Merciful of all who show mercy"
    ],
    "noteEn": "Reciting this alongside Kalimah and Istighfar, followed by Prayer 21, yields the most profound blessings."
  },
  "monajat-21": {
    "benefitsEn": [
      "Affirmation of true faith that serves as an intercessor for complete divine pardon",
      "Shields from the torment and fires of the Hellfire",
      "Strengthens resolute adherence to Islamic monotheism"
    ],
    "noteEn": "The closing verse of Surah Al-Mu’minun. Highly recommended to be paired with Prayer 20."
  },
  "monajat-22": {
    "benefitsEn": [
      "Ward off the agony of Hellfire whose torment is perpetual and devastating",
      "Protects one’s home and dwelling place from evil and spiritual destruction",
      "Instills reverence and caution in one’s daily living"
    ],
    "noteEn": "One of the defining prayers of the beloved servants of the Most Merciful (Ibadur-Rahman) described in the Quran."
  },
  "monajat-23": {
    "benefitsEn": [
      "Brings deep harmony, mutual joy, and coolness of the eyes in marriage and family",
      "Cultivates pious, noble children who become beacons of righteousness",
      "Grants leadership in piety and righteousness among the God-conscious"
    ],
    "noteEn": "The premier Quranic supplication for family tranquility, marital affection, and the cultivation of an exemplary future generation."
  },
  "monajat-24": {
    "benefitsEn": [
      "Bestowal of sound wisdom, deep discernment, and true righteousness",
      "Joining the company of the righteous in this life and the next",
      "An enduring honorable mention and upright legacy among subsequent generations"
    ],
    "noteEn": "The prayer of Prophet Ibrahim (Abraham, peace be upon him). The fusion of authentic wisdom and righteous action anchors the truth firmly within the heart."
  },
  "monajat-25": {
    "benefitsEn": [
      "Inspires heartfelt gratitude for the countless blessings bestowed upon oneself and parents",
      "Guidance to perform righteous deeds that earn the direct pleasure of Allah",
      "Reform and righteousness bestowed upon one’s descendants and family"
    ],
    "noteEn": "The Quran particularly advises frequent recitation of this prayer upon reaching the age of forty. It is best followed by abundant praises (Hamd)."
  },
  "monajat-26": {
    "benefitsEn": [
      "Cleanses the heart from malice, rancor, jealousy, and ill-will toward fellow believers",
      "Forgiveness for oneself and for all brothers and sisters who preceded in faith",
      "Nurtures a pure, expansive heart imbued with divine tenderness and compassion"
    ],
    "noteEn": "Supplicating with a generous, cleansed heart for fellow believers is one of the quickest ways to have one’s own personal prayers answered."
  },
  "monajat-27": {
    "benefitsEn": [
      "Completion and perfection of divine light on the Day of Judgment (the bridge of Sirat)",
      "Total pardon and covering of sins on that terrifying Day",
      "Absolute trust in Allah’s boundless omnipotence over all things"
    ],
    "noteEn": "Especially when facing adversity or injustice against the righteous, reciting this together with Prayers 2 and 3 provides tremendous spiritual sanctuary."
  },
  "hamd-1": {
    "benefitsEn": [
      "The foundational praise of the Universe; reciting it attracts divine mercy and blessings in all matters",
      "Attunes the soul to the supreme Lordship and benevolence of Allah over all realms of existence"
    ]
  },
  "hamd-2": {
    "benefitsEn": [
      "Acknowledges Allah as the sole Creator of heavens, earth, darkness, and light",
      "Purifies the heart from all subtle forms of polytheism and restores clarity of vision"
    ]
  },
  "hamd-3": {
    "benefitsEn": [
      "Brings total severance of the roots of oppression and injustice",
      "Strengthens the certainty that ultimate triumph belongs to justice and truth"
    ]
  },
  "hamd-4": {
    "benefitsEn": [
      "Bestows deep peace, removing all sorrow, grief, and inner heavy burdens",
      "Reminds the heart of the eternal bliss and divine fulfillment awaiting in Paradise"
    ]
  },
  "hamd-5": {
    "benefitsEn": [
      "Affirms Allah as self-sufficient, without partners, offspring, or weaknesses requiring a helper",
      "Reciting this regularly magnifies the greatness of Allah in the believer’s daily life"
    ],
    "noteEn": "Reciting this verse 50, 100, or as many times as possible with deep meditation brings immense spiritual strength."
  },
  "hamd-6": {
    "benefitsEn": [
      "Expresses immense gratitude for the divine revelation and straight guidance of the Quran",
      "Protects from doctrinal deviations, confusion, and moral corruptions"
    ]
  },
  "hamd-7": {
    "benefitsEn": [
      "Salvation from the people of oppression, wrongdoing, and corruption",
      "Strengthens trust in Allah during times of persecution and distress"
    ]
  },
  "hamd-8": {
    "benefitsEn": [
      "Recognition of divine favors, intellectual gifts, and wisdom over many creations",
      "Humility in moments of success and high worldly or spiritual achievement"
    ]
  },
  "hamd-9": {
    "benefitsEn": [
      "Protection from the fires of Hell and relief from all anxieties regarding the afterlife",
      "Opens the gates of divine reward and spiritual tranquility"
    ]
  },
  "hamd-10": {
    "benefitsEn": [
      "Gratitude for old age, preservation of health, and the blessing of children",
      "Fosters deep love for Allah who hears and answers every sincere prayer"
    ]
  },
  "hamd-11": {
    "benefitsEn": [
      "Fulfillment of true divine promises and inheritance of the high stations of Jannah",
      "Sparks enduring hope and motivation for righteous deeds"
    ]
  },
  "hamd-12": {
    "benefitsEn": [
      "Celebrates the majesty of Allah as the unique Originator of the heavens and the earth",
      "Inspires awe regarding the vast angelic creation and divine power"
    ]
  },
  "hamd-13": {
    "benefitsEn": [
      "Praise of the King to whom belongs everything in the heavens and on earth",
      "Reiterates that the highest wisdom and knowledge belong to Allah alone"
    ]
  },
  "hamd-14": {
    "benefitsEn": [
      "Rejoicing in the removal of all lingering sadness and anxiety",
      "Confidence in Allah as the Most Forgiving, Appreciative of every small good deed"
    ],
    "noteEn": "Combining this with the succeeding verse (Surah Ghafir, 65) carries exceptional spiritual benefit."
  },
  "hamd-15": {
    "benefitsEn": [
      "Acknowledgment that only Allah possesses the keys to the unseen and absolute judgment",
      "Brings deep contentment when faced with the outcomes of divine decree"
    ]
  },
  "hamd-16": {
    "benefitsEn": [
      "Affirms that all pride and supremacy in the cosmos belong exclusively to Allah",
      "Crushes arrogance and vanity in the human heart"
    ]
  },
  "hamd-17": {
    "benefitsEn": [
      "Praise of the Living, Eternal Lord who never dies or tires",
      "Deepens pure devotion and sincerity in worship"
    ]
  },
  "hamd-18": {
    "benefitsEn": [
      "Recognizes Allah’s supreme authority over the throne and all creation",
      "Brings comfort knowing that the cosmos is governed by supreme justice"
    ]
  },
  "hamd-19": {
    "benefitsEn": [
      "Exalts Allah above all human limitations and fabricated associations",
      "Safeguards faith against intellectual distortions and doubts"
    ]
  },
  "hamd-20": {
    "benefitsEn": [
      "Praise for the succession of day and night, rain, and the sustenance of life",
      "Nurtures profound gratitude for everyday physical and natural blessings"
    ]
  },
  "hamd-21": {
    "benefitsEn": [
      "Peace and greetings of peace upon the honorable Messengers of God",
      "Connects the reciter to the unbroken chain of divine prophecy"
    ]
  },
  "hamd-22": {
    "benefitsEn": [
      "A universal declaration of praise that encompasses all realms and beings",
      "The ultimate praise uttered by the dwellers of Paradise"
    ]
  },
  "hamd-23": {
    "benefitsEn": [
      "The concluding call of the believers in Paradise: All praise belongs to the Lord of the worlds",
      "Inspires a life lived with the sole aim of pleasing the Creator"
    ]
  },
  "amal-1": {
    "benefitsEn": [
      "Strengthens the bond of kinship, compassion, and upright social morality",
      "Instills high moral principles and guards against shameful conduct"
    ]
  },
  "amal-2": {
    "benefitsEn": [
      "Deepens remembrance of Allah morning and evening",
      "Builds a spiritual fortress around the mind against worldly temptations"
    ]
  },
  "amal-3": {
    "benefitsEn": [
      "Reconciliation of disputes among believers and maintaining brotherhood",
      "Preserves unity and mutual goodwill among the community"
    ]
  },
  "amal-4": {
    "benefitsEn": [
      "Fosters truthfulness and integrity in trade, agreements, and speech",
      "Attracts divine blessings (Barakah) in livelihood and affairs"
    ]
  },
  "amal-5": {
    "benefitsEn": [
      "Cultivates selfless spending in times of prosperity and adversity",
      "Restrains anger and fosters ready forgiveness towards others"
    ]
  },
  "amal-6": {
    "benefitsEn": [
      "Patience in adversity and reliance upon the wisdom of Allah",
      "Brings tranquility and fortitude during unexpected hardships"
    ],
    "noteEn": "There is a special recommendation to meditate upon this verse in deep quietude."
  },
  "amal-7": {
    "benefitsEn": [
      "Fulfills the supreme duty of kindness and gentle care for parents",
      "Secures divine pleasure through honoring one’s mother and father"
    ]
  },
  "amal-8": {
    "benefitsEn": [
      "Observing justice without compromise, even against one’s own self or relatives",
      "Protects from prejudice, bias, and unfair judgment"
    ]
  },
  "amal-9": {
    "benefitsEn": [
      "The renowned Verse of Light (Ayat an-Nur) illuminating the heart with divine guidance",
      "Removes spiritual darkness, anxiety, and perplexity"
    ],
    "noteEn": "In this verse, Allah describes His divine light through the most sublime parable."
  },
  "amal-10": {
    "benefitsEn": [
      "Humility in walking upon the earth and answering hostility with peace",
      "Exemplifies the sublime demeanor of the true servants of God"
    ]
  },
  "amal-11": {
    "benefitsEn": [
      "Spending the night in prayer and prostration (Qiyam al-Layl)",
      "Draws down divine mercy during the quiet hours before dawn"
    ]
  },
  "amal-12": {
    "benefitsEn": [
      "Seeking protection through the sacred closing verses of Surah Al-Baqarah",
      "Provides sufficient protection for the entire night from all evils"
    ],
    "noteEn": "It is highly recommended to recite this mindfully before retiring to sleep."
  },
  "amal-13": {
    "benefitsEn": [
      "Surrendering all affairs unto the Almighty who knows every secret",
      "Dispels terror, sorrow, and feeling of isolation"
    ]
  },
  "iman-1": {
    "benefitsEn": [
      "A cardinal principle for strengthening faith and expiating sins: good deeds drive away evil deeds."
    ]
  },
  "iman-2": {
    "benefitsEn": [
      "Attaining worldly and eternal success through bowing, prostration, worship, and active benevolence."
    ]
  },
  "iman-3": {
    "benefitsEn": [
      "Fortifying faith through the undeniable truth of divine unity and the Day of Resurrection."
    ]
  },
  "iman-4": {
    "benefitsEn": [
      "Instruction in shedding arrogance and falling in humble prostration and glorification before Allah."
    ]
  },
  "iman-5": {
    "benefitsEn": [
      "Awakens deep contemplation of Quranic warnings and the profound reality of Monotheism."
    ]
  },
  "iman-6": {
    "benefitsEn": [
      "Unshakable conviction in the ultimate triumph of Truth and the inevitable destruction of falsehood."
    ]
  },
  "iman-7": {
    "benefitsEn": [
      "Growth in guidance through treading the righteous path and securing the enduring rewards of good deeds."
    ]
  },
  "iman-8": {
    "benefitsEn": [
      "Direct divine direction, companionship, and steadfastness in exchange for striving in Allah’s way."
    ]
  },
  "iman-9": {
    "benefitsEn": [
      "A deeply spiritually potent verse; reciting it frequently grants fortitude in conquering base desires (Nafs)."
    ]
  },
  "iman-10": {
    "benefitsEn": [
      "Reciting this verse quells doubts and deceptive questionings stirred by the lower self."
    ]
  },
  "iman-11": {
    "benefitsEn": [
      "Achieving completion of faith by discarding heedlessness and falling in reverent prostration before Allah."
    ]
  }
};

const BOOK_ENTRIES = [
  // ==========================================================================
  // CHAPTER 1: 27 MONAJAT (প্রার্থনা ১ - ২৭)
  // ==========================================================================
  {
    id: 'monajat-1',
    chapter: 'monajat',
    num: 1,
    labelBn: 'প্রার্থনা-১',
    labelEn: 'Prayer 1',
    surahBn: 'সূরা বাকারাহ্, ২০১',
    surahEn: 'Surah Al-Baqarah (2:201)',
    page: '৪',
    tags: ['Both Worlds', 'Protection', 'Prosperity'],
    ayahs: [{ surah: 2, ayah: 201 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমাদের ইহকালে কল্যাণ দাও এবং পরকালেও কল্যাণ দাও এবং আমাদেরকে দোযখের আগুন থেকে রক্ষা কর।',
    enTranslation: 'Our Lord! grant us good in this world and good in the Hereafter, and save us from the chastisement of the fire.',
    benefitsBn: [
      'ইহকালের সার্বিক মঙ্গল হবে (রোগ-ব্যাধি, অভাব-অনটন ও দুঃখ-দুর্দশার ক্ষেত্রে)',
      'মন পরকাল-মুখী হবে বলে ঈমান বৃদ্ধি পাবে ও অল্প পেলেও সন্তুষ্টি আসবে',
      'পরকালে জাহান্নামের আগুন থেকে নাজাত পাওয়া যাবে'
    ],
    noteBn: 'আল্লাহ তায়ালা চান আমরা ইহকালের পাশাপাশি পরকালের প্রতিও কাতর দৃষ্টি রাখি। উভয় জগতের কল্যাণ একত্রে চাওয়ায় এ দোয়া কবুল হওয়ার সম্ভাবনা অত্যন্ত বেশি।'
  },
  {
    id: 'monajat-2',
    chapter: 'monajat',
    num: 2,
    labelBn: 'প্রার্থনা-২',
    labelEn: 'Prayer 2',
    surahBn: 'সূরা বাকারাহ্, ২৫০',
    surahEn: 'Surah Al-Baqarah (2:250)',
    page: '৭',
    tags: ['Patience', 'Strength', 'Protection'],
    ayahs: [{ surah: 2, ayah: 250 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমাদের ধৈর্য দান কর, আমাদের পা অবিচলিত রাখ এবং অবিশ্বাসী সম্প্রদায়ের বিরুদ্ধে আমাদের সাহায্য দান কর।',
    enTranslation: 'Our Lord, pour down upon us patience, and make our steps firm and assist us against the unbelieving people.',
    benefitsBn: [
      'ধৈর্য ধারণের ক্ষমতা অর্জিত হয়ে রোগমুক্তি ও অভাবমুক্তি ঘটবে',
      'তাওয়াক্কুল বা আল্লাহর প্রতি নির্ভরতা বৃদ্ধি পাবে ও চরিত্র মজবুত হবে',
      'কঠোর ঈমানী পরীক্ষায় অবিচল থাকার শক্তি ও আল্লাহর নৈকট্য অর্জিত হবে'
    ],
    noteBn: 'আল্লাহর সাহায্য ছাড়া ধৈর্য ধারণ সম্ভব নয়। বিপদে ধৈর্য ও সুখে সংযম—উভয় ক্ষেত্রেই এ দোয়া অপরিহার্য।'
  },
  {
    id: 'monajat-3',
    chapter: 'monajat',
    num: 3,
    labelBn: 'প্রার্থনা-৩',
    labelEn: 'Prayer 3',
    surahBn: 'সূরা বাকারাহ্, ২৮৬',
    surahEn: 'Surah Al-Baqarah (2:286)',
    page: '১১',
    tags: ['Forgiveness', 'Peace', 'Protection'],
    ayahs: [{ surah: 2, ayah: 286 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! যদি আমরা বিস্মৃত হই অথবা ভুল করি তবে তুমি আমাদের অপরাধী করো না। হে আমাদের প্রতিপালক! আমাদের পূর্ববর্তীগণের ওপর যেমন গুরুদায়িত্ব অর্পণ করেছিলে আমাদের ওপর তেমন দায়িত্ব অর্পণ করো না। হে আমাদের প্রতিপালক! এমন ভার আমাদের ওপর অর্পণ করো না যা বহন করার শক্তি আমাদের নেই। আমাদের পাপ মোচন কর, আমাদের ক্ষমা কর, আমাদের প্রতি দয়া কর, তুমি আমাদের অভিভাবক। অতএব সত্য প্রত্যাখ্যানকারী সম্প্রদায়ের বিরুদ্ধে আমাদের জয়যুক্ত কর।',
    enTranslation: 'Our Lord! do not punish us if we forget or make a mistake; Our Lord! do not lay on us a burden as Thou didst lay on those before us; Our Lord! do not impose upon us that which we have not the strength to bear; and pardon us and grant us protection and have mercy on us; Thou art our patron, so help us against the unbelieving people.',
    benefitsBn: [
      'অজ্ঞতাবশত বা ভুলক্রমে কৃত পাপ ক্ষমা হবে এবং পাপজনিত শাস্তি থেকে রেহাই মিলবে',
      'অন্তরে প্রশান্তি আসবে ও বিবেকযন্ত্রণা থেকে মুক্তি পাওয়া যাবে',
      'দৈনন্দিন সাংসারিক, সামাজিক ও অর্থনৈতিক কর্মকাণ্ড সহজ হবে'
    ],
    noteBn: "এই প্রার্থনায় তওবা, আত্মসমর্পণ ও আশ্রয় প্রার্থনা—সবই নিহিত আছে। আল্লাহর 'রব' নাম ধরে ডাকার কারণে সব ক্ষেত্রে নিশ্চিন্ত থাকা যায়।"
  },
  {
    id: 'monajat-4',
    chapter: 'monajat',
    num: 4,
    labelBn: 'প্রার্থনা-৪',
    labelEn: 'Prayer 4',
    surahBn: 'সূরা আল-ই-ইমরান, ৯',
    surahEn: "Surah Ali 'Imran (3:9)",
    page: '১৩',
    tags: ['Hereafter', 'Faith'],
    ayahs: [{ surah: 3, ayah: 9 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! তুমি মানবজাতিকে একদিন একত্রে সমাবেশ করবে এতে কোনো সন্দেহ নেই। (নিশ্চয়ই আল্লাহ প্রতিশ্রুতির ব্যতিক্রম করেন না।)',
    enTranslation: 'Our Lord! surely Thou art the Gatherer of men on a Day about which there is no doubt. Surely Allah does not fail in His promise.',
    benefitsBn: [
      'মন পরকাল-সচেতন হবে এবং নফসের কুপ্রবৃত্তি দমন হবে',
      'তাকওয়া বা আল্লাহ-ভীতি বৃদ্ধি পাবে ও পার্থিব মায়ামোহ দূর হবে',
      'আল্লাহর প্রতি আত্মসমর্পণ বৃদ্ধি পাওয়ায় অন্যান্য দোয়া কবুলের সম্ভাবনা বেড়ে যাবে'
    ],
    noteBn: 'বিচারদিনের ভয়াবহতা ও অনিবার্যতা স্মরণ করে হৃদয়ের গভীর থেকে নিবেদিত প্রার্থনা। অন্যান্য দোয়ার আগে এটি পড়া অত্যন্ত উত্তম।'
  },
  {
    id: 'monajat-5',
    chapter: 'monajat',
    num: 5,
    labelBn: 'প্রার্থনা-৫',
    labelEn: 'Prayer 5',
    surahBn: 'সূরা আল-ই-ইমরান, ১৯১',
    surahEn: "Surah Ali 'Imran (3:191)",
    page: '১৫',
    tags: ['Knowledge', 'Protection'],
    ayahs: [{ surah: 3, ayah: 191 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! তুমি এ নিরর্থক সৃষ্টি করনি, তুমি পবিত্র, তুমি আমাদেরকে আগুনের শাস্তি থেকে রক্ষা কর।',
    enTranslation: 'Our Lord! Thou hast not created this in vain! Glory be to Thee; save us then from the chastisement of the fire.',
    benefitsBn: [
      'সৃষ্টিজগতের রহস্য উপলব্ধি ও প্রকৃত জ্ঞানলাভ হবে',
      'আল্লাহর কুদরত ও মহিমা অনুধাবন করে কৃতজ্ঞতা ও প্রশংসার হৃদয় তৈরি হবে',
      'জাহান্নামের শাস্তি থেকে সুরক্ষা মিলবে'
    ],
    noteBn: 'আকাশ বা বিস্তীর্ণ প্রকৃতির দিকে তাকিয়ে সৃষ্টির নিপুণতায় বিস্মিত হয়ে এই প্রার্থনা এবং ২৪নং প্রার্থনা নিবেদন করলে গভীর জ্ঞানলাভ হয়।'
  },
  {
    id: 'monajat-6',
    chapter: 'monajat',
    num: 6,
    labelBn: 'প্রার্থনা-৬',
    labelEn: 'Prayer 6',
    surahBn: 'সূরা আল-ই-ইমরান, ১৯২',
    surahEn: "Surah Ali 'Imran (3:192)",
    page: '১৭',
    tags: ['Protection', 'Faith'],
    ayahs: [{ surah: 3, ayah: 192 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! তুমি যাকে আগুনে প্রবেশ করাও (নিক্ষেপ কর) তাকে তুমি নিশ্চয় হেয় করলে, এবং অত্যাচারীদের জন্য কোনো সাহায্যকারী নেই।',
    enTranslation: 'Our Lord! surely whomsoever Thou makest enter the fire, him Thou hast indeed brought to disgrace, and there shall be no helpers for the unjust.',
    benefitsBn: [
      'নফসের পাপপ্রবণতা ও অহংকার কমে যাবে',
      'মনের হিংস্রতা, গোপন মোনাফেকি ও কুফরি দূর হবে',
      'ঈমান বৃদ্ধি পাবে এবং মন পরকালমুখী হবে'
    ],
    noteBn: 'মূলত ৫, ৬, ৭ ও ৮নং প্রার্থনা কোরআনে উল্লেখিত একটি অখণ্ড মোনাজাতের অংশ; একত্রে পড়া অত্যন্ত ফলদায়ক।'
  },
  {
    id: 'monajat-7',
    chapter: 'monajat',
    num: 7,
    labelBn: 'প্রার্থনা-৭',
    labelEn: 'Prayer 7',
    surahBn: 'সূরা আল-ই-ইমরান, ১৯৩',
    surahEn: "Surah Ali 'Imran (3:193)",
    page: '২০',
    tags: ['Forgiveness', 'Faith', 'Hereafter'],
    ayahs: [{ surah: 3, ayah: 193 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমরা এক আহ্বায়ককে বিশ্বাসের দিকে আহ্বান করতে শুনেছি: ‘তোমরা তোমাদের প্রতিপালকের প্রতি বিশ্বাস কর।’ সুতরাং আমরা বিশ্বাস স্থাপন করেছি। হে আমাদের প্রতিপালক! তুমি আমাদের পাপ ক্ষমা কর, আমাদের মন্দ কার্যগুলি দূরীভূত কর, এবং আমাদের সৎকর্মশীলদের মতো মৃত্যু দাও।',
    enTranslation: 'Our Lord! surely we have heard a preacher calling to the faith, saying: believe in your Lord, so we did believe; Our Lord! forgive us therefore our faults, and cover our evil deeds and make us die with the righteous.',
    benefitsBn: [
      'জীবনের শ্রেষ্ঠ কাম্যবস্তু—ঈমানের সাথে মৃত্যু নসিব হবে',
      'সকল পাপ ক্ষমা ও মন্দ কাজ দূরীভূত হবে',
      'সৎকর্মশীল ও নেককার বান্দাদের অন্তর্ভুক্ত হওয়া যাবে'
    ],
    noteBn: 'এই মোনাজাতে রাসূল (সা.)-এর আহ্বানের সত্যতার সাক্ষ্য ও ঈমানের স্বীকৃতি দিয়ে ক্ষমা চাওয়া হয়েছে।'
  },
  {
    id: 'monajat-8',
    chapter: 'monajat',
    num: 8,
    labelBn: 'প্রার্থনা-৮',
    labelEn: 'Prayer 8',
    surahBn: 'সূরা আল-ই-ইমরান, ১৯৪',
    surahEn: "Surah Ali 'Imran (3:194)",
    page: '২২',
    tags: ['Hereafter', 'Faith'],
    ayahs: [{ surah: 3, ayah: 194 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! রসূলগণের মাধ্যমে আমাদের যা দিতে প্রতিশ্রুতি দিয়েছ তা আমাদের দাও এবং কিয়ামতের দিন আমাদেরকে হেয় কর না। নিশ্চয় তুমি প্রতিশ্রুতির ব্যতিক্রম কর না।',
    enTranslation: 'Our Lord! and grant us what Thou hast promised us through Thy apostles and disgrace us not on the Day of Resurrection; surely Thou dost not fail to perform the promise.',
    benefitsBn: [
      'আল্লাহ ও তাঁর রাসূল (আ.) গণের প্রতি ভক্তি ও আস্থা বৃদ্ধি পাবে',
      'অন্তরে জাতিভেদ বিলুপ্ত হয়ে তাওহীদ প্রতিষ্ঠিত হবে',
      'কিয়ামতের দিন লাঞ্ছনা থেকে মুক্তি ও শাফায়াত লাভ সহজ হবে'
    ],
    noteBn: 'নিজের ফরমায়েশের চেয়ে আল্লাহ নবী-রাসূলগণের মাধ্যমে যে পুরস্কারের প্রতিশ্রুতি দিয়েছেন তা চাওয়াই সর্বোচ্চ আদব।'
  },
  {
    id: 'monajat-9',
    chapter: 'monajat',
    num: 9,
    labelBn: 'প্রার্থনা-৯',
    labelEn: 'Prayer 9',
    surahBn: 'সূরা আল-ই-ইমরান, ২৬–২৭',
    surahEn: "Surah Ali 'Imran (3:26–27)",
    page: '২৪–২৫',
    tags: ['Prosperity', 'Protection', 'Healing'],
    ayahs: [
      { surah: 3, ayah: 26 },
      { surah: 3, ayah: 27 }
    ],
    bnTranslation: 'হে সার্বভৌম শক্তির মালিক আল্লাহ! তুমি যাকে ইচ্ছা রাজ্যদান কর, এবং যা থেকে ইচ্ছা রাজ্য কেড়ে নাও, এবং যাকে ইচ্ছা সম্মানিত কর, আর যাকে ইচ্ছা অপমানিত কর। যাবতীয় কল্যাণ তোমার হাতেই। নিশ্চয় তুমি সকল বিষয়ে সর্বশক্তিমান। তুমি রাতকে দিনে, দিনকে রাতে পরিবর্তন কর, এবং তুমিই মৃত হতে জীবন্তের আবির্ভাব ঘটাও, আবার জীবন্ত থেকে মৃতের আবির্ভাব ঘটাও। তুমি যাকে ইচ্ছা অপরিমিত জীবনোপকরণ দান কর।',
    enTranslation: 'O Allah, Master of the kingdom! Thou givest the kingdom to whomsoever Thou pleasest and takest away the kingdom from whomsoever Thou pleasest, and Thou exaltest whom Thou pleasest and abasest whom Thou pleasest; in Thine hand is the good; surely, Thou hast power over all things. Thou makest the night to pass into the day and Thou makest the day to pass into the night, and Thou bringest forth the living from the dead and Thou bringest forth the dead from the living, and Thou givest sustenance to whom Thou pleasest without measure.',
    benefitsBn: [
      'বিপদাপদ দূর হবে এবং রোগমুক্তি ও স্বাস্থ্যোন্নতি লাভ হবে',
      'হালাল রিযিকের দরজা খুলে যাবে এবং সম্মান ও সমৃদ্ধি লাভ হবে',
      'সংসার, সমাজ ও ধর্মের কঠিন দায়িত্বপালন সহজ হবে'
    ],
    noteBn: 'এই প্রার্থনাটি একই সঙ্গে আল্লাহর সার্বভৌমত্বের স্বীকৃতি, নিঃশর্ত আত্মসমর্পণ এবং শরীকহীন প্রশংসা (হামদ)।'
  },
  {
    id: 'monajat-10',
    chapter: 'monajat',
    num: 10,
    labelBn: 'প্রার্থনা-১০',
    labelEn: 'Prayer 10',
    surahBn: 'সূরা আ’রাফ, ২৩',
    surahEn: "Surah Al-A'raf (7:23)",
    page: '২৭',
    tags: ['Forgiveness', 'Protection'],
    ayahs: [{ surah: 7, ayah: 23 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমরা নিজেদের প্রতি অন্যায় করেছি। যদি তুমি আমাদের ক্ষমা না কর এবং দয়া না কর, তবে অবশ্য আমরা ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।',
    enTranslation: 'Our Lord! we have been unjust to ourselves, and if Thou forgive us not, and have (not) mercy on us, we shall certainly be of the losers.',
    benefitsBn: [
      'যাবতীয় পাপের জন্য অন্তরে লজ্জাবোধ ও নম্রতা সৃষ্টি হবে',
      'অহংকার কমবে এবং যেকোনো পাপ যে নিজেরই ক্ষতি সে সচেতনতা জন্মাবে',
      'ইহকালের বিপদাপদ ও পরকালের ক্ষতি থেকে মুক্তি মিলবে'
    ],
    noteBn: 'হযরত আদম ও হাওয়া (আ.)-এর তওবার দোয়া। নামাজের ভেতরেও আমরা এটি নিবেদন করে থাকি।'
  },
  {
    id: 'monajat-11',
    chapter: 'monajat',
    num: 11,
    labelBn: 'প্রার্থনা-১১',
    labelEn: 'Prayer 11',
    surahBn: 'সূরা আ’রাফ, ৪৭',
    surahEn: "Surah Al-A'raf (7:47)",
    page: '২৯',
    tags: ['Protection', 'Faith'],
    ayahs: [{ surah: 7, ayah: 47 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমাদের পাপিষ্ঠদের সঙ্গী করো না।',
    enTranslation: 'Our Lord! place us not with the unjust people.',
    benefitsBn: [
      'ইহকালে ও পরকালে সৎ ও ভালো মানুষের সঙ্গ লাভ এবং অসৎ সঙ্গ থেকে দূরে থাকা যাবে',
      'মনের পাপ-প্রবণতা কমবে ও পাপের প্রতি ঘৃণাবোধ জন্মাবে',
      'সামাজিক আচরণ ও লেনদেনে পবিত্রতা প্রতিফলিত হবে'
    ],
    noteBn: 'সৎসঙ্গে স্বর্গবাস, অসৎসঙ্গে সর্বনাশ। পরকালে একই বিশ্বাস ও আমলের লোকেরা একই দলভুক্ত হবে।'
  },
  {
    id: 'monajat-12',
    chapter: 'monajat',
    num: 12,
    labelBn: 'প্রার্থনা-১২',
    labelEn: 'Prayer 12',
    surahBn: 'সূরা হূদ, ৪৭',
    surahEn: 'Surah Hud (11:47)',
    page: '৩১',
    tags: ['Knowledge', 'Forgiveness'],
    ayahs: [{ surah: 11, ayah: 47 }],
    bnTranslation: 'হে আমার প্রতিপালক! যে বিষয়ে আমার জ্ঞান নেই, সে বিষয়ে যাতে আপনাকে অনুরোধ না করি এ জন্য আমি আপনার শরণ নিচ্ছি। আপনি যদি আমাকে ক্ষমা না করেন এবং দয়া না করেন তবে আমি ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।',
    enTranslation: 'My Lord! I seek refuge in Thee from asking Thee that of which I have no knowledge; and if Thou shouldst not forgive me and have mercy on me, I should be of the losers.',
    benefitsBn: [
      'মনের মধ্যে ভারসাম্য সৃষ্টি হয়ে কোন বিষয়ে দোয়া করা উচিত বা অনুচিত তা বোঝার প্রজ্ঞা জন্মাবে',
      'অজ্ঞানতাবশত অন্যায় আবদার করার অপরাধ থেকে রক্ষা পাওয়া যাবে',
      'আল্লাহর ক্ষমা ও দয়া লাভ হবে'
    ],
    noteBn: 'হযরত নূহ (আ.)-এর প্রার্থনা। অনেক সময় কোনো জিনিস না পাওয়াই আমাদের জন্য মঙ্গলজনক, যা আমরা বুঝতে পারি না।'
  },
  {
    id: 'monajat-13',
    chapter: 'monajat',
    num: 13,
    labelBn: 'প্রার্থনা-১৩',
    labelEn: 'Prayer 13',
    surahBn: 'সূরা ইউসুফ, ১০১',
    surahEn: 'Surah Yusuf (12:101)',
    page: '৩৪',
    tags: ['Hereafter', 'Faith', 'Protection'],
    ayahs: [{ surah: 12, ayah: 101 }],
    bnTranslation: 'হে আকাশমণ্ডলী ও পৃথিবীর স্রষ্টা! তুমিই ইহলোক ও পরলোকে আমার অভিভাবক। তুমি আমাকে (মুসলমান অবস্থায়) আত্মসমর্পণকারীর মৃত্যু দাও এবং আমাকে সৎ-কর্মপরায়ণদের অন্তর্ভুক্ত কর।',
    enTranslation: 'Originator of the heavens and the earth! Thou art my Guardian in this world and the Hereafter; make me die a Muslim and join me with the good.',
    benefitsBn: [
      'মৃত্যুর সময় ঈমান ও আত্মসমর্পণকারীর মৃত্যু নসিব হবে',
      'চেতনা ও বিশ্বাসে ইহকাল ও পরকালের মধ্যে অবিচ্ছিন্ন সংযোগ স্থাপিত হবে',
      'সৎকর্মপরায়ণ বান্দাদের কাতারে শামিল হওয়ার সৌভাগ্য মিলবে'
    ],
    noteBn: 'হযরত ইউসুফ (আ.)-এর প্রার্থনা। যিনি জীবনদাতা তিনিই মৃত্যুদাতা—এই উপলব্ধি মনে দূরত্ব ও সন্দেহ দূর করে।'
  },
  {
    id: 'monajat-14',
    chapter: 'monajat',
    num: 14,
    labelBn: 'প্রার্থনা-১৪',
    labelEn: 'Prayer 14',
    surahBn: 'সূরা ইব্রাহীম, ৩৮',
    surahEn: 'Surah Ibrahim (14:38)',
    page: '৩৭',
    tags: ['Peace', 'Forgiveness', 'Faith'],
    ayahs: [{ surah: 14, ayah: 38 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! নিশ্চয়ই তুমি জান যা আমরা গোপন করি ও যা আমরা প্রকাশ করি, আকাশমণ্ডলী ও পৃথিবীর কিছুই আল্লাহ্র নিকট গোপন থাকে না।',
    enTranslation: 'O Our Lord! Surely Thou knowest what we hide and what we make public, and nothing in the earth nor anything in heaven is hidden from Allah.',
    benefitsBn: [
      'অন্তরে সর্বক্ষণ আল্লাহর স্মরণ ও পর্যবেক্ষণের অনুভূতি প্রতিষ্ঠিত হবে',
      'গোপন ও প্রকাশ্য পাপ থেকে দূরে থাকা সহজ হবে',
      'অতীতের ভুল উপলব্ধি হয়ে খাঁটি তওবা করার সুযোগ সৃষ্টি হবে'
    ],
    noteBn: 'গভীর রাতে তাহাজ্জুদ নামাজের পর লজ্জা, ভয় ও আনুগত্য সহকারে এটি নিবেদন করলে অত্যন্ত ভালো ফল পাওয়া যায়।'
  },
  {
    id: 'monajat-15',
    chapter: 'monajat',
    num: 15,
    labelBn: 'প্রার্থনা-১৫',
    labelEn: 'Prayer 15',
    surahBn: 'সূরা ইব্রাহীম, ৪১',
    surahEn: 'Surah Ibrahim (14:41)',
    page: '৩৯',
    tags: ['Family', 'Forgiveness', 'Hereafter'],
    ayahs: [{ surah: 14, ayah: 41 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! যেদিন হিসাব হবে সেদিন আমাকে, আমার পিতা-মাতাকে, এবং বিশ্বাসীগণকে ক্ষমা কর।',
    enTranslation: 'O our Lord! grant me protection and my parents and the believers on the day when the reckoning shall come to pass!',
    benefitsBn: [
      'অন্যান্য মুসলমানের ক্ষমা চাওয়ার উছিলায় নিজের অন্যান্য দোয়াও দ্রুত কবুল হবে',
      'অহংকার কমে নম্রতা, ভদ্রতা ও সামাজিক মমত্ববোধ বৃদ্ধি পাবে',
      'বিচারদিনে নিজের, পিতা-মাতার ও মুমিনদের মুক্তি মিলবে'
    ],
    noteBn: 'পরকাল-সম্বন্ধীয় এবং সমগ্র বিশ্বাসী উম্মাহর কল্যাণকামী দোয়া হওয়ায় এটি অত্যন্ত শক্তিশালী।'
  },
  {
    id: 'monajat-16',
    chapter: 'monajat',
    num: 16,
    labelBn: 'প্রার্থনা-১৬',
    labelEn: 'Prayer 16',
    surahBn: 'সূরা কাহাফ, ১০',
    surahEn: 'Surah Al-Kahf (18:10)',
    page: '৪১',
    tags: ['Prosperity', 'Peace', 'Forgiveness'],
    ayahs: [{ surah: 18, ayah: 10 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! তুমি নিজে হতে আমাদের অনুগ্রহ দান কর এবং আমাদের জন্য আমাদের কাজকর্ম সঠিকভাবে পরিচালনার ব্যবস্থা কর।',
    enTranslation: 'Our Lord! grant us mercy from Thee, and provide for us right course in our affairs.',
    benefitsBn: [
      'আল্লাহর বিশেষ অনুগ্রহ ও দয়া লাভ হবে',
      'পাপমুক্ত হওয়া যাবে এবং পাপজনিত শাস্তি থেকে রেহাই মিলবে',
      'জীবনের জটিল কাজকর্ম সঠিকভাবে পরিচালনার পথ সুগম হবে'
    ],
    noteBn: 'আসহাবে কাহাফের দোয়া। নিজের অসহায়ত্ব স্বীকার করে আল্লাহর রহমত প্রার্থনার একটি সংক্ষিপ্ত অথচ পূর্ণাঙ্গ মোনাজাত।'
  },
  {
    id: 'monajat-17',
    chapter: 'monajat',
    num: 17,
    labelBn: 'প্রার্থনা-১৭',
    labelEn: 'Prayer 17',
    surahBn: 'সূরা ত্বা-হা, ২৫–২৮',
    surahEn: 'Surah Ta-Ha (20:25–28)',
    page: '৪৩',
    tags: ['Knowledge', 'Prosperity'],
    ayahs: [
      { surah: 20, ayah: 25 },
      { surah: 20, ayah: 26 },
      { surah: 20, ayah: 27 },
      { surah: 20, ayah: 28 }
    ],
    bnTranslation: 'হে আমার প্রতিপালক! আমার বক্ষ প্রশস্ত করে দাও, এবং আমার কাজ সহজ করে দাও। আমার জিহ্বার জড়তা দূর করে দাও। যাতে ওরা আমার কথা বুঝতে পারে।',
    enTranslation: 'O my Lord! Expand my breast for me, And make my affair easy to me, And loose the knot from my tongue, (that) they may understand my word.',
    benefitsBn: [
      'কথাবার্তায় আত্মবিশ্বাস ও নিজের মনোভাব স্বাচ্ছন্দ্যে প্রকাশের যোগ্যতা অর্জিত হবে',
      'কঠিন দায়িত্বের কাজ সহজে সম্পন্ন হবে',
      'কথার ভুলত্রুটি, তোতলামি ও আড়ষ্টতা দূর হয়ে বক্তব্য প্রভাবশালী হবে'
    ],
    noteBn: 'হযরত মূসা (আ.)-এর দোয়া। পবিত্র কোরআন তিলাওয়াত শুরুর আগে এবং কোনো ভালো উদ্দেশ্যে বক্তৃতা দেয়ার আগে এটি পড়া উত্তম।'
  },
  {
    id: 'monajat-18',
    chapter: 'monajat',
    num: 18,
    labelBn: 'প্রার্থনা-১৮ (সন্তান লাভের প্রার্থনা)',
    labelEn: 'Prayer 18 (For Righteous Offspring)',
    surahBn: 'সূরা আম্বীয়া, ৮৯',
    surahEn: 'Surah Al-Anbiya (21:89)',
    page: '৪৫',
    tags: ['Family', 'Prosperity'],
    ayahs: [{ surah: 21, ayah: 89 }],
    bnTranslation: 'হে আমার প্রতিপালক! আমাকে নিঃসন্তান রেখো না, তুমি তো চূড়ান্ত মালিকানার অধিকারী।',
    enTranslation: 'O my Lord! leave me not alone; and Thou art the best of inheritors.',
    benefitsBn: [
      'নেক ও সুসন্তান লাভ হবে',
      'বংশধারা আল্লাহর পথে পরিচালিত হওয়ার তাওফিক মিলবে'
    ],
    noteBn: 'হযরত যাকারিয়া (আ.)-এর প্রার্থনা। শর্ত হলো সন্তান চাইতে হবে একমাত্র আল্লাহর জন্য এবং তাকে আল্লাহর পথে গড়ে তোলার নিয়তে।'
  },
  {
    id: 'monajat-19',
    chapter: 'monajat',
    num: 19,
    labelBn: 'প্রার্থনা-১৯',
    labelEn: 'Prayer 19',
    surahBn: 'সূরা আম্বীয়া, ১১২',
    surahEn: 'Surah Al-Anbiya (21:112)',
    page: '৪৭',
    tags: ['Peace', 'Protection'],
    ayahs: [{ surah: 21, ayah: 112 }],
    bnTranslation: 'হে আমার প্রতিপালক, তুমি ন্যায়ের সাথে মীমাংসা করে দাও, আমাদের প্রতিপালক তো দয়াময়।',
    enTranslation: 'O my Lord! Judge Thou with truth; and our Lord is the Beneficent God.',
    benefitsBn: [
      'যেকোনো ভুল বোঝাবুঝি ও অমীমাংসিত বিরোধের ন্যায়সঙ্গত সমাধান হবে',
      'প্রতিপক্ষের ভুল থাকলে আল্লাহ তার মন নরম করে মীমাংসার পথ খুলে দেবেন'
    ],
    noteBn: 'দোয়াটি করার সময় উদ্দিষ্ট সমস্যার কথা মনে স্মরণ রাখতে হবে এবং নিজের ত্রুটি থাকলে তা সংশোধনে প্রস্তুত থাকতে হবে।'
  },
  {
    id: 'monajat-20',
    chapter: 'monajat',
    num: 20,
    labelBn: 'প্রার্থনা-২০',
    labelEn: 'Prayer 20',
    surahBn: 'সূরা মোমেনূন, ১০৯',
    surahEn: "Surah Al-Mu'minun (23:109)",
    page: '৪৯',
    tags: ['Forgiveness', 'Faith'],
    ayahs: [{ surah: 23, ayah: 109 }],
    bnTranslation: 'হে আমার প্রতিপালক! আমরা বিশ্বাস স্থাপন করেছি, তুমি আমাদের ক্ষমা কর ও দয়া কর, তুমি তো দয়ালুদের মধ্যে শ্রেষ্ঠ দয়ালু।',
    enTranslation: 'O our Lord! we believe, so do Thou forgive us and have mercy on us, and Thou art the best of the Merciful ones.',
    benefitsBn: [
      'ঈমান ও তওবার সূত্র ধরে আল্লাহর বিশেষ ক্ষমা ও শ্রেষ্ঠ দয়া লাভ হবে',
      'গুনাহ মাফ হয়ে আধ্যাত্মিক উন্নতি ঘটবে'
    ],
    noteBn: 'কালেমা ও ইস্তেগফার পাঠের পর এই প্রার্থনা এবং ২১নং প্রার্থনা একত্রে নিবেদন করলে সর্বোত্তম ফল পাওয়া যায়।'
  },
  {
    id: 'monajat-21',
    chapter: 'monajat',
    num: 21,
    labelBn: 'প্রার্থনা-২১',
    labelEn: 'Prayer 21',
    surahBn: 'সূরা মোমেনূন, ১১৮',
    surahEn: "Surah Al-Mu'minun (23:118)",
    page: '৫০',
    tags: ['Forgiveness', 'Peace'],
    ayahs: [{ surah: 23, ayah: 118 }],
    bnTranslation: 'হে আমার প্রতিপালক! ক্ষমা কর ও দয়া কর, দয়ালুদের মধ্যে তুমিই তো শ্রেষ্ঠ দয়ালু।',
    enTranslation: 'O my Lord! forgive and have mercy, and Thou art the best of the Merciful ones.',
    benefitsBn: [
      'আল্লাহর অপরিসীম রহমত ও ক্ষমা লাভ হবে',
      'সংক্ষিপ্ত হওয়ায় সর্বাবস্থায় জিকির হিসেবে পাঠ করা সহজ'
    ],
    noteBn: 'সূরা মু’মিনূনের সমাপনী আয়াত। ২০নং প্রার্থনার সাথে মিলিয়ে পড়ার পরামর্শ দেওয়া হয়েছে।'
  },
  {
    id: 'monajat-22',
    chapter: 'monajat',
    num: 22,
    labelBn: 'প্রার্থনা-২২',
    labelEn: 'Prayer 22',
    surahBn: 'সূরা ফুরকান, ৬৫',
    surahEn: 'Surah Al-Furqan (25:65)',
    page: '৫২',
    tags: ['Protection', 'Hereafter', 'Peace'],
    ayahs: [{ surah: 25, ayah: 65 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমাদের জাহান্নামের শাস্তি নিবৃত্ত কর; জাহান্নামের শাস্তি তো নিশ্চিত বিনাশ।',
    enTranslation: 'O our Lord! turn away from us the punishment of hell, surely the punishment there is of a lasting evil.',
    benefitsBn: [
      'পরকাল-কেন্দ্রিক দোয়া হওয়ায় অতি সহজে কবুল হয়',
      'ঈমান বাড়ে এবং ইহকালের অস্থিরতা ও দুঃখবোধ লাঘব হয়',
      'জাহান্নামের ভয়াবহ শাস্তি থেকে সুরক্ষা মেলে'
    ],
    noteBn: 'রহমানের প্রিয় বান্দাদের (ইবাদুর রহমান) অন্যতম বৈশিষ্ট্যপূর্ণ দোয়া।'
  },
  {
    id: 'monajat-23',
    chapter: 'monajat',
    num: 23,
    labelBn: 'প্রার্থনা-২৩',
    labelEn: 'Prayer 23',
    surahBn: 'সূরা ফুরকান, ৭৪',
    surahEn: 'Surah Al-Furqan (25:74)',
    page: '৫৪',
    tags: ['Family', 'Peace', 'Prosperity'],
    ayahs: [{ surah: 25, ayah: 74 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমাদের স্ত্রী ও সন্তান সন্ততিদের আমাদের জন্য নয়নপ্রীতিকর কর এবং আমাদেরকে সাবধানীদের জন্য আদর্শস্বরূপ কর।',
    enTranslation: 'O our Lord! grant us in our wives and our offspring the joy of our eyes, and make us guides to those who guard (against evil).',
    benefitsBn: [
      'সংসারে তৃপ্তি, সুখ এবং পারস্পরিক মধুর সম্পর্ক গড়ে উঠবে',
      'স্ত্রী ও সন্তান-সন্ততিদের নেক আমল দেখে চোখ জুড়িয়ে যাবে',
      'উত্তম ও মোহনীয় চরিত্র এবং মুত্তাকীদের নেতৃত্ব লাভ হবে'
    ],
    noteBn: 'পারিবারিক শান্তি ও আদর্শ প্রজন্ম গঠনের শ্রেষ্ঠ কোরআনিক মোনাজাত।'
  },
  {
    id: 'monajat-24',
    chapter: 'monajat',
    num: 24,
    labelBn: 'প্রার্থনা-২৪',
    labelEn: 'Prayer 24',
    surahBn: 'সূরা শোয়া’রা, ৮৩',
    surahEn: "Surah Ash-Shu'ara (26:83)",
    page: '৫৬',
    tags: ['Knowledge', 'Faith'],
    ayahs: [{ surah: 26, ayah: 83 }],
    bnTranslation: 'হে আমার প্রতিপালক! আমাকে জ্ঞান দান কর এবং সৎকর্মপরায়ণদের অন্তর্ভুক্ত কর।',
    enTranslation: 'My Lord: Grant me wisdom, and join me with the good.',
    benefitsBn: [
      'দৃশ্য ও অদৃশ্যজগতের প্রকৃত জ্ঞান ও প্রজ্ঞা লাভ হবে',
      'জ্ঞানের অন্ধত্ব ও অহংকার থেকে রক্ষা পাওয়া যাবে এবং যুক্তিবিচারের ক্ষমতা বাড়বে',
      'সৎসঙ্গ লাভ হবে, মন উদার হবে এবং পাপের প্রতি ঘৃণা জন্মাবে'
    ],
    noteBn: 'হযরত ইব্রাহীম (আ.)-এর দোয়া। জ্ঞান ও সৎকর্মের সমন্বয়ে হৃদয়ে সত্য স্থিত হয়।'
  },
  {
    id: 'monajat-25',
    chapter: 'monajat',
    num: 25,
    labelBn: 'প্রার্থনা-২৫',
    labelEn: 'Prayer 25',
    surahBn: 'সূরা আহক্বাফ, ১৫',
    surahEn: 'Surah Al-Ahqaf (46:15)',
    page: '৫৯',
    tags: ['Family', 'Prosperity', 'Forgiveness'],
    ayahs: [{ surah: 46, ayah: 15 }],
    bnTranslation: 'হে আমার প্রতিপালক! তুমি আমাকে সামর্থ্য দাও যাতে আমি তোমার প্রতি কৃতজ্ঞতা প্রকাশ করতে পারি, আমার প্রতি ও আমার পিতা-মাতার প্রতি তুমি যে অনুগ্রহ দান করেছ তার জন্য এবং যাতে আমি সৎকাজ করতে পারি যা তুমি পছন্দ কর; আমার সন্তান-সন্ততিদের সৎকর্মপরায়ণ কর, আমি তোমারই অভিমুখী হলাম এবং আত্মসমর্পণ করলাম।',
    enTranslation: 'My Lord! grant me I may give thanks for the favor which Thou hast bestowed on me and on my parents, and that I may do good which pleases Thee and do good to me in respect of my offspring; surely I turn to Thee, and surely I am of those who submit.',
    benefitsBn: [
      'যথাযোগ্য উপায়ে আল্লাহর প্রশংসা ও কৃতজ্ঞতা প্রকাশের যোগ্যতা অর্জিত হবে',
      'তওবা ও আত্মসমর্পণ গৃহীত হয়ে মনে ও সংসারে অনন্ত শান্তি আসবে',
      'বংশধারা নেককার হবে এবং জীবনে সফলতা, সচ্ছলতা ও সম্মান লাভ হবে'
    ],
    noteBn: 'বিশেষত ৪০ বছর বয়সে উপনীত হলে এই দোয়া বেশি বেশি পাঠ করার নির্দেশনা কোরআনে রয়েছে। দোয়ার শেষে প্রচুর হামদ পড়া উচিত।'
  },
  {
    id: 'monajat-26',
    chapter: 'monajat',
    num: 26,
    labelBn: 'প্রার্থনা-২৬',
    labelEn: 'Prayer 26',
    surahBn: 'সূরা হাশ্র, ১০',
    surahEn: 'Surah Al-Hashr (59:10)',
    page: '৬১',
    tags: ['Forgiveness', 'Peace', 'Faith'],
    ayahs: [{ surah: 59, ayah: 10 }],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমাদের এবং বিশ্বাসে অগ্রণী আমাদের ভ্রাতাগণকে ক্ষমা কর এবং বিশ্বাসীদের বিরুদ্ধে আমাদের অন্তরে হিংসা-বিদ্বেষ রেখো না। হে আমাদের প্রতিপালক! তুমি তো দয়ার্দ্র, পরম দয়ালু।',
    enTranslation: 'Our Lord! forgive us and those of our brethren who had precedence of us in faith, and do not allow any spite to remain in our hearts towards those who believe; our Lord! surely Thou art kind, Merciful.',
    benefitsBn: [
      'সারা জীবনের গুনাহ মাফ হওয়ার উছিলা তৈরি হবে',
      'অন্তর হিংসা-বিদ্বেষমুক্ত হয়ে উদার হবে এবং ভ্রাতৃত্ববোধ জাগবে',
      'সকলের আদর-ভালোবাসা পাওয়া যাবে এবং ঈমান মজবুত হবে'
    ],
    noteBn: 'পরিষ্কার ও উদার দিল নিয়ে এই প্রার্থনা করলে এর উছিলায় অন্যান্য ব্যক্তিগত প্রার্থনাও কবুল হয়।'
  },
  {
    id: 'monajat-27',
    chapter: 'monajat',
    num: 27,
    labelBn: 'প্রার্থনা-২৭',
    labelEn: 'Prayer 27',
    surahBn: 'সূরা মুমতাহীনা, ৪–৫',
    surahEn: 'Surah Al-Mumtahanah (60:4–5)',
    page: '৬৩',
    tags: ['Protection', 'Strength', 'Forgiveness'],
    ayahs: [
      { surah: 60, ayah: 4 },
      { surah: 60, ayah: 5 }
    ],
    bnTranslation: 'হে আমাদের প্রতিপালক! আমরা তো তোমারই ওপর নির্ভর করেছি, তোমারই অভিমুখী হয়েছি এবং প্রত্যাবর্তন তো তোমারই নিকট। হে আমাদের প্রতিপালক! তুমি আমাদের সত্যপ্রত্যাখ্যানকারীদের পীড়নের পাত্র করো না, হে আমাদের প্রতিপালক! তুমি আমাদের ক্ষমা কর; তুমি তো পরাক্রমশালী, প্রজ্ঞাময়।',
    enTranslation: 'Our Lord! on Thee do we rely, and to Thee do we turn, and to Thee is the final goal: Our Lord! do not make us a trial for those who disbelieve, and forgive us; our Lord! surely Thou art the Mighty, the Wise.',
    benefitsBn: [
      'মনে সৎসাহস জাগবে এবং জালিমদের অত্যাচার-পীড়ন থেকে রক্ষা পাওয়া যাবে',
      'তাওয়াক্কুল ও আত্মসমর্পণ সহজ হবে এবং অন্তরে জিকির জাগ্রত হবে',
      'আল্লাহর ক্ষমা ও ঈমানের দৃঢ়তা অর্জিত হবে'
    ],
    noteBn: 'প্রতিকূল পরিবেশে বা মুসলমানদের ওপর বিপদ-অত্যাচারের আশঙ্কা থাকলে ২নং ও ৩নং মোনাজাতের সাথে এটি পড়া অত্যন্ত উত্তম।'
  },

  // ==========================================================================
  // CHAPTER 2: HAMD (হাম্দ ১ - ২৩)
  // ==========================================================================
  {
    id: 'hamd-1',
    chapter: 'hamd',
    num: 1,
    labelBn: 'হাম্দ-১ (সূরা ফাতিহা)',
    labelEn: 'Hamd 1 (Surah Al-Fatihah)',
    surahBn: 'সূরা ফাতিহা, ১–৭',
    surahEn: 'Surah Al-Fatihah (1:1–7)',
    page: '৬৭–৬৮',
    tags: ['Healing', 'Prosperity', 'Peace', 'Faith'],
    ayahs: [
      { surah: 1, ayah: 1 },
      { surah: 1, ayah: 2 },
      { surah: 1, ayah: 3 },
      { surah: 1, ayah: 4 },
      { surah: 1, ayah: 5 },
      { surah: 1, ayah: 6 },
      { surah: 1, ayah: 7 }
    ],
    bnTranslation: 'সমস্ত প্রশংসা বিশ্বজগতের প্রতিপালক আল্লাহ্রই প্রাপ্য, যিনি অনন্ত করুণাময়, পরম দয়ালু, (যিনি) কর্মফল দিবসের প্রভু, আমরা কেবল তোমারই উপাসনা করি এবং তোমারই কাছে সাহায্য প্রার্থনা করি, আমাদের সরল সঠিক (সত্য) পথে চালিত কর, তাদের পথে—যাদের তুমি অনুগ্রহ দান করেছ, যারা তোমার ক্রোধে পড়েনি এবং বিপথে যায়নি। (আমীন)',
    enTranslation: 'Praise be to God, Lord of the Universe, the Mercy giving, the Merciful! Ruler on the Day for Repayment! You do we worship and You do we call on for help. Guide us along the Straight Road, the road of those whom you have favored, with whom you are not angry, nor who are lost! (Ameen)',
    benefitsBn: [
      'প্রশংসার হক আদায় হওয়ায় দোয়া কবুল হবে এবং আল্লাহর ক্ষমা ও দয়া পাওয়া যাবে',
      'বিপদ-মুক্তি, রোগমুক্তি ও সংসারে সচ্ছলতা আসবে',
      'ঈমান মজবুত হবে ও উপযুক্ত পথপ্রদর্শকের সান্নিধ্য নসিব হবে'
    ]
  },
  {
    id: 'hamd-2',
    chapter: 'hamd',
    num: 2,
    labelBn: 'হাম্দ-২',
    labelEn: 'Hamd 2',
    surahBn: 'সূরা ইউনুস, ১০',
    surahEn: 'Surah Yunus (10:10)',
    page: '৬৯',
    tags: ['Peace', 'Hereafter', 'Forgiveness'],
    ayahs: [{ surah: 10, ayah: 10 }],
    bnTranslation: 'সেখানে তাদের প্রার্থনা হবে, “হে আল্লাহ্! তুমি মহান পবিত্র!” আর সেথায় তাদের অভিবাদন হবে, “সালাম”। তাদের শেষ প্রার্থনা হবে, “সমস্ত প্রশংসা সারাজাহানের রব আল্লাহ্রই জন্য।”',
    enTranslation: 'Their prayer there will be, "Glory be to you, O God!" While their Greeting in it will be: "Peace!" and the close of their appeal: "Praise be to God, Lord of the universe!"',
    benefitsBn: [
      'পরকালের প্রতি আকর্ষণ বাড়বে এবং অন্তরে প্রশান্তি লাভ হবে',
      'আল্লাহর প্রশংসার উল্লেখ থাকায় তাঁর ক্ষমা লাভ করা যাবে'
    ]
  },
  {
    id: 'hamd-3',
    chapter: 'hamd',
    num: 3,
    labelBn: 'হাম্দ-৩',
    labelEn: 'Hamd 3',
    surahBn: 'সূরা নাহল, ১',
    surahEn: 'Surah An-Nahl (16:1)',
    page: '৭০',
    tags: ['Faith', 'Peace'],
    ayahs: [{ surah: 16, ayah: 1 }],
    bnTranslation: 'আল্লাহ পবিত্র-মহিমান্বিত এবং তারা যে শরীক সাব্যস্ত করে তিনি তার অনেক ঊর্ধ্বে।',
    enTranslation: 'Glory be to Him! Exalted is He over anything they may associate (with Him)!',
    benefitsBn: [
      'অন্তরে পবিত্রতা আসবে, মন পরিষ্কার হবে ও তাওহীদ প্রতিষ্ঠিত হবে',
      'মনের লুকানো মোনাফেকি ও শিরকি ভাব দূর হয়ে ঈমান, তাকওয়া ও আল্লাহ-প্রেম বাড়বে'
    ]
  },
  {
    id: 'hamd-4',
    chapter: 'hamd',
    num: 4,
    labelBn: 'হাম্দ-৪',
    labelEn: 'Hamd 4',
    surahBn: 'সূরা কাহফ, ১০৯',
    surahEn: 'Surah Al-Kahf (18:109)',
    page: '৭১',
    tags: ['Knowledge', 'Faith'],
    ayahs: [{ surah: 18, ayah: 109 }],
    bnTranslation: 'বল: যদি আমার রবের মহিমা-বাণী লেখার জন্য সমুদ্র কালি হয়, তবে অবশ্যই সমুদ্র নিঃশেষ হয়ে যাবে আমার রবের মহিমা-বাণী শেষ হবার পূর্বেই, যদিও এর অনুরূপ আরও সমুদ্রকে সাহায্যার্থে নিয়ে আসি।',
    enTranslation: "Say: if the sea were an inkwell for the words of my Lord, the sea would be drained before my Lord's words would be spent even though we brought the same again to replenish it.",
    benefitsBn: [
      'জ্ঞান ও মারেফত হাসিল হবে এবং জ্ঞানের অন্ধত্ব ঘুচে যাবে',
      'আমিত্ব, রিয়া (লোক দেখানো ধার্মিকতা) ও অহংকার কমে আত্মসমর্পণ সহজ হবে',
      'কোরআনের প্রতি গভীর মহব্বত সৃষ্টি হবে'
    ]
  },
  {
    id: 'hamd-5',
    chapter: 'hamd',
    num: 5,
    labelBn: 'হাম্দ-৫',
    labelEn: 'Hamd 5',
    surahBn: 'সূরা আম্বীয়া, ২৩',
    surahEn: 'Surah Al-Anbiya (21:23)',
    page: '৭২',
    tags: ['Faith', 'Protection'],
    ayahs: [{ surah: 21, ayah: 23 }],
    bnTranslation: 'তিনি যা করেন সে সম্বন্ধে তিনি জিজ্ঞাসিত হবেন না, বরং তাদেরকে জিজ্ঞাসা করা হবে।',
    enTranslation: 'He will not be questioned about what He does while they shall be so questioned.',
    benefitsBn: [
      'নফসের বিদ্রোহ ও পাপের স্পৃহা দমিত হবে',
      'কঠিন আধ্যাত্মিক ব্যাধির নিরাময় হবে এবং তাকওয়া ও ঈমান বাড়বে'
    ],
    noteBn: 'আয়াতটিকে ৫০/১০০ বা যত বেশিবার একসাথে পড়া যায় তত ভালো।'
  },
  {
    id: 'hamd-6',
    chapter: 'hamd',
    num: 6,
    labelBn: 'হাম্দ-৬',
    labelEn: 'Hamd 6',
    surahBn: 'সূরা মোমেনূন, ৯২',
    surahEn: "Surah Al-Mu'minun (23:92)",
    page: '৭৩',
    tags: ['Knowledge', 'Peace', 'Faith'],
    ayahs: [{ surah: 23, ayah: 92 }],
    bnTranslation: 'তিনি পরিজ্ঞাতা অদৃশ্যের ও দৃশ্যের, আর তারা যা শরীক করে তিনি তার বহু ঊর্ধ্বে।',
    enTranslation: 'Knower of the unseen and the visible: exalted is He over anything they may associate (with him)!',
    benefitsBn: [
      'দৃশ্য ও অদৃশ্যজগতের জ্ঞানলাভ হবে এবং মন উদ্বেগমুক্ত হবে',
      'তাওয়াক্কুল বাড়বে, লুকানো মোনাফেকি দূর হবে এবং খাঁটি তওবার স্পৃহা জাগবে',
      'আল্লাহ সম্বন্ধে ভ্রান্ত রূপক ধারণা মন থেকে মুছে যাবে'
    ]
  },
  {
    id: 'hamd-7',
    chapter: 'hamd',
    num: 7,
    labelBn: 'হাম্দ-৭',
    labelEn: 'Hamd 7',
    surahBn: 'সূরা মোমেনূন, ১১৬',
    surahEn: "Surah Al-Mu'minun (23:116)",
    page: '৭৪',
    tags: ['Prosperity', 'Healing', 'Peace'],
    ayahs: [{ surah: 23, ayah: 116 }],
    bnTranslation: 'অতএব আল্লাহ্ই মহিমান্বিত, তিনি প্রকৃত মালিক, তিনি ছাড়া অন্য কোনো মা’বুদ নেই, তিনিই সম্মানিত আরশের মালিক।',
    enTranslation: 'Exalted is God, the true King! There is no deity except Him, Lord of the Noble Throne!',
    benefitsBn: [
      'সমৃদ্ধি আসবে এবং সম্পত্তি ও সম্পদ সুরক্ষিত থাকবে',
      'অন্তরে কৃতজ্ঞতা জাগবে, সম্মান বৃদ্ধি পাবে ও অহংকার দুর্বল হবে',
      'মনের উৎকণ্ঠা দূর হবে এবং রোগমুক্ত হওয়া যাবে'
    ]
  },
  {
    id: 'hamd-8',
    chapter: 'hamd',
    num: 8,
    labelBn: 'হাম্দ-৮',
    labelEn: 'Hamd 8',
    surahBn: 'সূরা নামূল্, ৯৩',
    surahEn: 'Surah An-Naml (27:93)',
    page: '৭৫',
    tags: ['Knowledge', 'Faith'],
    ayahs: [{ surah: 27, ayah: 93 }],
    bnTranslation: 'আপনি বলুন: সকল প্রশংসা আল্লাহর জন্য, তিনি শীঘ্রই তাঁর নিদর্শনসমূহ তোমাদেরকে দেখাবেন, তখন তোমরা তা চিনতে পারবে। তোমরা যা কর সে সম্বন্ধে তোমার রব গাফেল নন।',
    enTranslation: 'Say: "Praise be to God! He will show you His signs so you may recognize them. Your Lord is not overlooking anything you do!"',
    benefitsBn: [
      'কোরআনের এবং শরীয়তের গূঢ় অর্থ হৃদয়ঙ্গম হবে ও আধ্যাত্মিক দৃষ্টি তীক্ষ্ণ হবে',
      'নামাজ ও আল্লাহর ওপর আস্থা বাড়বে এবং ইবাদতে আলস্য দূর হবে'
    ]
  },
  {
    id: 'hamd-9',
    chapter: 'hamd',
    num: 9,
    labelBn: 'হাম্দ-৯',
    labelEn: 'Hamd 9',
    surahBn: 'সূরা কাসাস্, ৬৮',
    surahEn: 'Surah Al-Qasas (28:68)',
    page: '৭৬',
    tags: ['Faith', 'Prosperity'],
    ayahs: [{ surah: 28, ayah: 68 }],
    bnTranslation: 'আর তোমার রব যা ইচ্ছা সৃষ্টি করেন এবং যাকে ইচ্ছা মনোনীত করেন, এতে তাদের কোনো ক্ষমতা নেই। আল্লাহ পবিত্র, মহান এবং তারা যে শরীক করে তার অতি ঊর্ধ্বে।',
    enTranslation: 'Your Lord creates and chooses anything He wishes; while they have no choice. Praise be to God; Exalted is He over anything they may associate with Him!',
    benefitsBn: [
      'ইবাদতে নফসের অনিচ্ছা দূর হবে ও সমাজে নেতৃত্ব লাভ হবে',
      'অন্তর সাফ হবে, অহংকার কমবে এবং বেশি বেশি আল্লাহর প্রশংসা করতে ইচ্ছে হবে'
    ]
  },
  {
    id: 'hamd-10',
    chapter: 'hamd',
    num: 10,
    labelBn: 'হাম্দ-১০',
    labelEn: 'Hamd 10',
    surahBn: 'সূরা ক্বাসাস্, ৭০',
    surahEn: 'Surah Al-Qasas (28:70)',
    page: '৭৭',
    tags: ['Peace', 'Prosperity', 'Hereafter'],
    ayahs: [{ surah: 28, ayah: 70 }],
    bnTranslation: 'আর তিনিই আল্লাহ্, তিনি ছাড়া অন্য কোনো উপাস্য নেই। দুনিয়া ও আখেরাতে সকল প্রশংসা তাঁরই এবং বিধান তাঁরই। তোমরা তাঁরই সমীপে প্রত্যাবর্তিত হবে।',
    enTranslation: 'He is God (Alone); There is no deity except Him! Praise belongs to Him from the very first as well as in the Hereafter. Discretion is His, and to Him will you (all) return.',
    benefitsBn: [
      'অন্তরে তাওহীদ প্রতিষ্ঠিত হবে এবং দুনিয়ার মোহ কেটে মন পরকালমুখী হবে',
      'সুখ-সমৃদ্ধি বৃদ্ধি পাবে এবং মনে তৃপ্তি আসবে',
      'শরীয়তের বিধান অনুসরণ করার ক্ষেত্রে মন বিদ্রোহ করবে না'
    ]
  },
  {
    id: 'hamd-11',
    chapter: 'hamd',
    num: 11,
    labelBn: 'হাম্দ-১১',
    labelEn: 'Hamd 11',
    surahBn: 'সূরা লুকমান, ২৭',
    surahEn: 'Surah Luqman (31:27)',
    page: '৭৮',
    tags: ['Knowledge', 'Prosperity'],
    ayahs: [{ surah: 31, ayah: 27 }],
    bnTranslation: 'আর সমগ্র পৃথিবীতে যত বৃক্ষ আছে তা সবই যদি কলম হয় এবং যে সমুদ্র রয়েছে তার সাথে যদি আরো সাতটি সমুদ্র শামিল হয়ে কালি হয়, তবুও আল্লাহর বাণী শেষ হবে না। নিশ্চয়ই আল্লাহ পরাক্রমশালী, প্রজ্ঞাময়।',
    enTranslation: "If only the trees on earth were pens and the (inky) sea were later on replenished with seven other seas, God's words would never be exhausted; God is powerful, wise!",
    benefitsBn: [
      'কোরআনের অনেক গোপন অর্থ জানা যাবে ও অন্তরের দিব্য দৃষ্টি খুলে যাবে',
      'আমিত্ব কমবে, আত্মসমর্পণ সহজ হবে এবং সুখ-সমৃদ্ধি লাভ হবে'
    ]
  },
  {
    id: 'hamd-12',
    chapter: 'hamd',
    num: 12,
    labelBn: 'হাম্দ-১২',
    labelEn: 'Hamd 12',
    surahBn: 'সূরা সাবা, ১',
    surahEn: 'Surah Saba (34:1)',
    page: '৭৯',
    tags: ['Healing', 'Peace', 'Prosperity'],
    ayahs: [{ surah: 34, ayah: 1 }],
    bnTranslation: 'সকল প্রশংসা আল্লাহর, যাঁর মালিকানাধীন যা কিছু আছে আসমানে এবং যা কিছু আছে জমিনে, আর আখেরাতেও সকল প্রশংসা তাঁরই। তিনি প্রজ্ঞাময়, সব কিছু অবহিত।',
    enTranslation: 'Praise be to God, who holds whatever is in Heavens and whatever is on Earth! Praise will be His in the Hereafter; He is the Wise, the Informed.',
    benefitsBn: [
      'দুনিয়ার লালসা কমবে, উপাসনায় আনন্দ ও অন্তরে তৃপ্তি পাওয়া যাবে',
      'রোগমুক্তি নসীব হবে ও সুখ-সমৃদ্ধি লাভ হবে'
    ]
  },
  {
    id: 'hamd-13',
    chapter: 'hamd',
    num: 13,
    labelBn: 'হাম্দ-১৩',
    labelEn: 'Hamd 13',
    surahBn: 'সূরা সাফ্ফাত, ১৮০–১৮২',
    surahEn: 'Surah As-Saffat (37:180–182)',
    page: '৮০',
    tags: ['Protection', 'Prosperity', 'Healing'],
    ayahs: [
      { surah: 37, ayah: 180 },
      { surah: 37, ayah: 181 },
      { surah: 37, ayah: 182 }
    ],
    bnTranslation: 'তারা যা বলে থাকে তা থেকে আপনার রব, যিনি মহা-মহিমান্বিত সকল ক্ষমতার মালিক, পবিত্র-মহান। শান্তি বর্ষিত হোক রসূলদের প্রতি! প্রশংসা বিশ্বজগতের প্রতিপালক আল্লাহ্র প্রাপ্য।',
    enTranslation: 'Glory be to your Lord, the Lord of Grandeur, beyond what they describe! Peace be on the emissaries! Praise to God, Lord of the universe!',
    benefitsBn: [
      'বিপদে সাহায্য পাওয়া যাবে, স্বাস্থ্য রক্ষা হবে এবং হালাল রুজি ও সম্মান বৃদ্ধি পাবে',
      'ঈমানের ভ্রান্তি দূর হয়ে দিল সাফ হবে ও অন্তরে শান্তি অনুভূত হবে'
    ]
  },
  {
    id: 'hamd-14',
    chapter: 'hamd',
    num: 14,
    labelBn: 'হাম্দ-১৪',
    labelEn: 'Hamd 14',
    surahBn: 'সূরা যুমার, ৫',
    surahEn: 'Surah Az-Zumar (39:5)',
    page: '৮১–৮২',
    tags: ['Healing', 'Patience', 'Prosperity'],
    ayahs: [{ surah: 39, ayah: 5 }],
    bnTranslation: 'তিনি আসমান ও জমিন সৃষ্টি করেছেন যথাযথভাবে। তিনি রাত্রি দিয়ে দিনকে আচ্ছাদিত করেন এবং দিন দিয়ে রাত্রিকে আচ্ছাদিত করেন। তিনি নিয়মাধীন করেছেন সূর্য ও চন্দ্রকে। প্রত্যেকেই নির্ধারিত সময় পর্যন্ত চলতে থাকবে। জেনে রাখ, তিনি পরাক্রমশালী, পরম ক্ষমাশীল।',
    enTranslation: 'He has created Heaven and Earth for truth. He wraps night up in daytime, and wraps daytime up in night. He regulates the sun and the moon: each runs along on a specific course. Is He not the powerful, the forgiving?',
    benefitsBn: [
      'অন্য যেকোনো হামদের আগে পড়লে উত্তম ফল লাভ হয়',
      'বিপদ দূর হবে, সুস্বাস্থ্য ফিরে আসবে ও সহনশীলতা বাড়বে',
      'সমৃদ্ধি লাভ হবে, পাপ ক্ষমা হবে এবং উপাসনায় মন একাগ্র হবে'
    ],
    noteBn: 'পরবর্তী আয়াত (সূরা মুমিন, ৬৫)-এর সাথে মিলিয়ে আমল করলে বিশেষ ফজিলত পাওয়া যায়।'
  },
  {
    id: 'hamd-15',
    chapter: 'hamd',
    num: 15,
    labelBn: 'হাম্দ-১৫',
    labelEn: 'Hamd 15',
    surahBn: 'সূরা মুমিন (গাফির), ৬৫',
    surahEn: "Surah Al-Mu'min / Ghafir (40:65)",
    page: '৮১–৮২',
    tags: ['Faith', 'Forgiveness', 'Prosperity'],
    ayahs: [{ surah: 40, ayah: 65 }],
    bnTranslation: 'তিনি চিরঞ্জীব, তিনি ছাড়া কোনো উপাস্য নেই; সুতরাং তোমরা তাঁকেই ডাক তাঁর আনুগত্যে একনিষ্ঠ হয়ে। সকল প্রশংসা আল্লাহ্র যিনি সারা জাহানের পালনকর্তা।',
    enTranslation: 'He is the living; there is no deity except Him, so appeal to Him sincerely, (making) religion exclusively His. Praise be to God, Lord of the universe!',
    benefitsBn: [
      'অন্তরে তাওহীদ ও আনুগত্য বৃদ্ধি পাবে এবং প্রার্থনা কবুল হবে',
      'উপাসনায় আলস্য দূর হয়ে ঈমান দৃঢ় হবে'
    ]
  },
  {
    id: 'hamd-16',
    chapter: 'hamd',
    num: 16,
    labelBn: 'হাম্দ-১৬',
    labelEn: 'Hamd 16',
    surahBn: 'সূরা জাসিয়া, ৩৬–৩৭',
    surahEn: 'Surah Al-Jathiyah (45:36–37)',
    page: '৮৩',
    tags: ['Prosperity', 'Peace', 'Knowledge'],
    ayahs: [
      { surah: 45, ayah: 36 },
      { surah: 45, ayah: 37 }
    ],
    bnTranslation: 'বস্তুত সকল প্রশংসা একমাত্র আল্লাহর, যিনি আসমানেরও রব, জমিনেরও রব এবং সারা জাহানেরও রব। তাঁর শ্রেষ্ঠত্ব গৌরব-গরিমা আসমানে ও জমিনে এবং তিনিই প্রবল পরাক্রমশালী, প্রজ্ঞাময়।',
    enTranslation: 'Yet God merits praise as Lord of Heaven and Lord of Earth, even as Lord of the universe! He holds greatness in Heaven and Earth; He is the Powerful, the Wise!',
    benefitsBn: [
      'অহংকার কমবে, নফস দমন হবে এবং তাওয়াক্কুল বৃদ্ধি পাবে',
      'দুশ্চিন্তা থেকে মুক্ত থাকা যাবে এবং সম্মান ও রিযিক বৃদ্ধি পাবে'
    ]
  },
  {
    id: 'hamd-17',
    chapter: 'hamd',
    num: 17,
    labelBn: 'হাম্দ-১৭',
    labelEn: 'Hamd 17',
    surahBn: 'সূরা আর-রহমান, ৭৮',
    surahEn: 'Surah Ar-Rahman (55:78)',
    page: '৮৪',
    tags: ['Prosperity', 'Peace', 'Forgiveness'],
    ayahs: [{ surah: 55, ayah: 78 }],
    bnTranslation: 'কত বরকতময় আপনার রবের নাম, যিনি অধিপতি মহত্ত্বের ও মহানুভবতার!',
    enTranslation: "Blessed be your Lord's name, Possessor of Majesty and Splendor!",
    benefitsBn: [
      'রুজি বৃদ্ধি পাবে এবং রুজিতে বিশেষ বরকত হবে',
      'আল্লাহর ক্ষমা পাওয়া যাবে ও অন্তরে শান্তি অনুভূত হবে',
      'প্রার্থনার ও প্রশংসার তৃষ্ণা বাড়বে'
    ]
  },
  {
    id: 'hamd-18',
    chapter: 'hamd',
    num: 18,
    labelBn: 'হাম্দ-১৮',
    labelEn: 'Hamd 18',
    surahBn: 'সূরা হাদীদ, ১',
    surahEn: 'Surah Al-Hadid (57:1)',
    page: '৮৫',
    tags: ['Peace', 'Knowledge'],
    ayahs: [{ surah: 57, ayah: 1 }],
    bnTranslation: 'আসমানে ও জমিনে যা কিছু আছে, সকলেই আল্লাহ্র তাসবীহ পাঠ করে। আর তিনি পরাক্রমশালী, হেকমতওয়ালা।',
    enTranslation: 'Whatever is in Heaven and on Earth celebrates God. He is the Powerful, the Wise!',
    benefitsBn: [
      'আল্লাহর নামের মারেফত ও জিকির অন্তরে প্রতিষ্ঠিত হবে',
      'আমিত্ব একেবারে বিলুপ্ত হয়ে মন দুশ্চিন্তামুক্ত ও প্রশান্ত হবে'
    ]
  },
  {
    id: 'hamd-19',
    chapter: 'hamd',
    num: 19,
    labelBn: 'হাম্দ-১৯',
    labelEn: 'Hamd 19',
    surahBn: 'সূরা হাশর, ২৪',
    surahEn: 'Surah Al-Hashr (59:24)',
    page: '৮৬',
    tags: ['Knowledge', 'Healing', 'Faith'],
    ayahs: [{ surah: 59, ayah: 24 }],
    bnTranslation: 'তিনি আল্লাহ্, সৃষ্টিকর্তা, উদ্ভাবনকারী, রূপদাতা, তাঁর জন্য আছে সুন্দর সুন্দর নাম। আসমানে ও জমিনে যা কিছু আছে, সবই তাঁর পবিত্রতা-মহিমা বর্ণনা করে। তিনি পরাক্রমশালী, প্রজ্ঞাময়।',
    enTranslation: 'He is God, the Creator, the Maker, the Shaper. His are the Finest names, whatever is in Heaven and on Earth celebrates Him. He is the Powerful, the Wise.',
    benefitsBn: [
      'সুস্বাস্থ্য লাভ হবে এবং বুদ্ধি, প্রজ্ঞা ও বিচক্ষণতা বৃদ্ধি পাবে',
      'বিপদের সময় মাথায় সুবুদ্ধি আসবে এবং সৃজনশীল চিন্তা ও মেধাশক্তি বাড়বে',
      'আল্লাহ-প্রেম বাড়বে ও ঈমান মজবুত হবে'
    ]
  },
  {
    id: 'hamd-20',
    chapter: 'hamd',
    num: 20,
    labelBn: 'হাম্দ-২০',
    labelEn: 'Hamd 20',
    surahBn: 'সূরা সাফ্ফাত, ১৫৯–১৬৩',
    surahEn: 'Surah As-Saffat (37:159–163)',
    page: '৮৭–৮৮',
    tags: ['Protection', 'Faith', 'Strength'],
    ayahs: [
      { surah: 37, ayah: 159 },
      { surah: 37, ayah: 160 },
      { surah: 37, ayah: 161 },
      { surah: 37, ayah: 162 },
      { surah: 37, ayah: 163 }
    ],
    bnTranslation: 'তারা যা বলে তা থেকে আল্লাহ পবিত্র-মহান। তবে যারা আল্লাহর খাঁটি বান্দা, তারা পাকড়াও হয়ে আসবে না। অতএব তোমরা ও তোমাদের উপাস্যেরা—সবাই মিলেও কাউকে আল্লাহ্ সম্বন্ধে বিভ্রান্ত করতে পারবে না, কেবল তাকে ছাড়া যে দোযখে প্রবেশ করবে।',
    enTranslation: "Glory be to God over whatever they describe except for God's loyal servants! You and anything you serve cannot incite anyone against Him except for someone who will roast in Hades.",
    benefitsBn: [
      'বিপদ দূর হবে ও পরকালের মুক্তি নসিব হবে',
      'পরিবেশের বিরূপ ঈমান-বিধ্বংসী প্রভাব থেকে মন সুরক্ষিত থাকবে',
      'মনের মোহাচ্ছন্নতা কেটে প্রশান্তি ও জেহাদী শক্তি বৃদ্ধি পাবে'
    ]
  },
  {
    id: 'hamd-21',
    chapter: 'hamd',
    num: 21,
    labelBn: 'হাম্দ-২১',
    labelEn: 'Hamd 21',
    surahBn: 'সূরা রূম, ১৭–১৮',
    surahEn: 'Surah Ar-Rum (30:17–18)',
    page: '৮৯',
    tags: ['Peace', 'Prosperity', 'Faith'],
    ayahs: [
      { surah: 30, ayah: 17 },
      { surah: 30, ayah: 18 }
    ],
    bnTranslation: 'সুতরাং তোমরা আল্লাহর পবিত্রতা ও মহিমা ঘোষণা কর যখন সন্ধ্যায় উপনীত হও এবং যখন সকালে ওঠো। আর আসমানে ও জমিনে সকল প্রশংসা তো তাঁরই এবং অপরাহ্ণে ও যখন তোমরা দ্বিপ্রহরে উপনীত হও।',
    enTranslation: 'Glory be to God when you reach evening and when you arise in the morning! Praise belongs to Him throughout heaven and Earth and after supper and when you are at your noon hour.',
    benefitsBn: [
      'যথাসময়ে নামাজ পড়ার সচেতনতা মনের মধ্যে সক্রিয়তা লাভ করবে',
      'অহংকার দূর হবে এবং মন নিজের মধ্যে অসীমের সদা-বর্তমানতা অনুভব করবে',
      'নিজেকে হালকা ও রহমতপ্রাপ্ত মনে হবে এবং সুখ-সমৃদ্ধি লাভ হবে'
    ]
  },
  {
    id: 'hamd-22',
    chapter: 'hamd',
    num: 22,
    labelBn: 'হাম্দ-২২',
    labelEn: 'Hamd 22',
    surahBn: 'সূরা বাকারাহ্, ১৮৬',
    surahEn: 'Surah Al-Baqarah (2:186)',
    page: '৯০',
    tags: ['Protection', 'Strength', 'Faith'],
    ayahs: [{ surah: 2, ayah: 186 }],
    bnTranslation: 'আর আমার দাসগণ যখন আমার সম্বন্ধে তোমাকে প্রশ্ন করে, তখন তুমি বল, আমি তো কাছেই আছি। যখন কোনো প্রার্থনাকারী আমাকে ডাকে, আমি তার ডাকে সাড়া দিই। অতএব তারাও আমার ডাকে সাড়া দিক এবং আমাতে বিশ্বাস স্থাপন করুক—যাতে তারা ঠিক পথে চলতে পারে।',
    enTranslation: 'Whenever my servants ask you about Me, (it means) I am near. I answer the appeal of the prayerful one whenever he appeals to Me. Let them respond to Me and believe in Me so they may be directed!',
    benefitsBn: [
      'বিপদের বা অসহায়ত্বের মুহূর্তে অন্তরে সাহস, ভরসা ও সাহায্য পাওয়া যাবে',
      'এই আয়াত পাঠের পর মোনাজাত করলে মোনাজাতের ওপর পূর্ণ আস্থা আসবে'
    ]
  },
  {
    id: 'hamd-23',
    chapter: 'hamd',
    num: 23,
    labelBn: 'হাম্দ-২৩ (আয়াতুল কুরসী)',
    labelEn: 'Hamd 23 (Ayatul Kursi)',
    surahBn: 'সূরা বাকারাহ্, ২৫৫',
    surahEn: 'Surah Al-Baqarah (2:255)',
    page: '৯১–৯২',
    tags: ['Protection', 'Faith', 'Peace'],
    ayahs: [{ surah: 2, ayah: 255 }],
    bnTranslation: 'আল্লাহ! তিনি ছাড়া অন্য কোনো উপাস্য নেই। তিনি চিরঞ্জীব, অনাদি। তাঁকে তন্দ্রা অথবা নিদ্রা স্পর্শ করে না। আকাশ পৃথিবীতে যা কিছু আছে সমস্তই তাঁর। কে আছে যে তাঁর অনুমতি ছাড়া তাঁর কাছে সুপারিশ করবে? তাদের (মানুষের) সম্মুখে ও পশ্চাতে যা কিছু আছে তা তিনি অবগত আছেন। যা তিনি ইচ্ছা করেন তাছাড়া তাঁর জ্ঞানের কিছুই তারা (মানুষরা) আয়ত্ত করতে পারে না। তাঁর আসন আকাশ ও পৃথিবীতে পরিব্যাপ্ত, আর ওদের (আকাশ-পৃথিবীর) রক্ষণাবেক্ষণে তিনি ক্লান্ত হন না, তিনি অতি উচ্চ, মহামহিম।',
    enTranslation: 'God! There is no deity except Him, the Living, the Eternal! Slumber does not overtake Him, nor does sleep. What the heavens hold and what earth holds (belong) to Him. Who is there to intercede with Him except by His permission? He knows what lies before them and what behind them, while they embrace nothing of His knowledge except whatever He may wish. His seat extends far over heaven and earth. Preserving them both does not overburden Him. He is the Sublime, the Almighty!',
    benefitsBn: [
      'সর্বজনবিদিত মহিমান্বিত আয়াত যা সর্বপ্রকার অনিষ্ট থেকে সুরক্ষা দেয়',
      'আল্লাহর একত্ববাদ ও সার্বভৌমত্বের সর্বোচ্চ ঘোষণা'
    ]
  },

  // ==========================================================================
  // CHAPTER 3: IMPORTANT AMALS (গুরুত্বপূর্ণ আমল ১ - ১৩)
  // ==========================================================================
  {
    id: 'amal-1',
    chapter: 'amal',
    num: 1,
    labelBn: "আমল-১",
    labelEn: 'Amal 1',
    surahBn: 'সূরা নিসা, ২৭–২৮',
    surahEn: 'Surah An-Nisa (4:27–28)',
    page: '৯৫',
    tags: ['Faith', 'Forgiveness'],
    ayahs: [
      { surah: 4, ayah: 27 },
      { surah: 4, ayah: 28 }
    ],
    bnTranslation: 'আল্লাহ্ তোমাদের ক্ষমা করতে চান, আর যারা কামনা-বাসনার অনুসারী তারা চায় যে তোমরা ভীষণভাবে পথচ্যুত হও। আল্লাহ্ তোমাদের ভার লঘু করতে চান, মানুষ সৃষ্টিগতভাবেই দুর্বল।',
    enTranslation: 'God wants to turn to you, While those who follow their own passions Want you to give in utterly. God wants to lighten things for you, Since man was created weak!',
    benefitsBn: [
      'ঈমান বাড়বে এবং নফস দমন সহজ হবে',
      'সাধনার কঠোরতাকেও আনন্দময় মনে হবে'
    ]
  },
  {
    id: 'amal-2',
    chapter: 'amal',
    num: 2,
    labelBn: "আমল-২ (ঘুমানোর আগে)",
    labelEn: 'Amal 2 (Before Sleep)',
    surahBn: 'সূরা আন্’আম, ৬০',
    surahEn: "Surah Al-An'am (6:60)",
    page: '৯৬',
    tags: ['Protection', 'Peace'],
    ayahs: [{ surah: 6, ayah: 60 }],
    bnTranslation: 'তিনিই রাত্রিকালে তোমাদের নিদ্রা আনয়ন করেন এবং দিবসে তোমরা যা কর তা তিনি জানেন, অতঃপর দিবসে তোমাদের তিনি পুনরায় জাগরিত করেন যাতে নির্ধারিতকাল পূর্ণ হয়। অতঃপর তাঁর দিকেই তোমাদের প্রত্যাবর্তন, অনন্তর তোমরা যা কর সে সম্বন্ধে তিনি অবহিত করবেন।',
    enTranslation: 'He is the one who gathers you (all) in at night. He knows what you have accomplished by day; then He revives you in it so a stated period may be fulfilled. Then your return will be unto Him, when He will notify you about whatever you have been doing.',
    benefitsBn: [
      'নিজের আত্মাকে রাতে ঘুমানোর আগে আমল করলে শত্রুর মারাত্মক আক্রমণ লাগবে না',
      'ভয় থেকে রক্ষা পাবার জন্য চেতনা জাগ্রত থাকবে'
    ]
  },
  {
    id: 'amal-3',
    chapter: 'amal',
    num: 3,
    labelBn: "আমল-৩ (সকাল-সন্ধ্যা)",
    labelEn: 'Amal 3 (Morning & Evening)',
    surahBn: 'সূরা আন্ফাল, ২৪',
    surahEn: 'Surah Al-Anfal (8:24)',
    page: '৯৭',
    tags: ['Protection', 'Faith'],
    ayahs: [{ surah: 8, ayah: 24 }],
    bnTranslation: 'হে ঈমানদারগণ! তোমরা আল্লাহ ও তাঁর রাসূলের ডাকে সাড়া দাও যখন তিনি তোমাদেরকে এমন কিছুর দিকে ডাকেন যা তোমাদের জীবন দান করে। এবং জেনে রাখ যে আল্লাহ্ মানুষ ও তার হৃদয়ের মাঝামাঝি স্থানে অবস্থান করেন এবং তাঁরই নিকট তোমাদের একত্রিত করা হবে।',
    enTranslation: 'And know that God slips in between a man and his heart, and to Him you will (all) be summoned.',
    benefitsBn: [
      'প্রতিদিন সকালে এবং রাতে আমল করলে অন্তরে আল্লাহর চিন্তা সদাজাগ্রত থাকবে',
      'পাপ থেকে দূরে থাকা যাবে'
    ]
  },
  {
    id: 'amal-4',
    chapter: 'amal',
    num: 4,
    labelBn: "আমল-৪ (হাসবিয়াল্লাহ)",
    labelEn: 'Amal 4 (Hasbiyallahu)',
    surahBn: 'সূরা তওবা, ১২৯',
    surahEn: 'Surah At-Tawbah (9:129)',
    page: '৯৮',
    tags: ['Protection', 'Peace', 'Strength'],
    ayahs: [{ surah: 9, ayah: 129 }],
    bnTranslation: 'আমার জন্য আল্লাহ্ই যথেষ্ট, তিনি ব্যতীত অন্য কোনো উপাস্য নেই। আমি তাঁরই উপর নির্ভর করি এবং তিনি মহা আরশের অধিপতি।',
    enTranslation: '"God is enough for me! There is no deity except Him; On Him do I rely. He is Lord of the mighty Throne."',
    benefitsBn: [
      'আল্লাহই আমলকারীর জন্য যথেষ্ট হবেন',
      'অভাব-দুর্দশাকে তুচ্ছ মনে হবে এবং জীবনকে একটি জয়ের সংগ্রাম ব’লে মনে হবে'
    ]
  },
  {
    id: 'amal-5',
    chapter: 'amal',
    num: 5,
    labelBn: "আমল-৫ (ঘুমের আগে)",
    labelEn: 'Amal 5 (Before Sleep)',
    surahBn: 'সূরা হূদ, ১২৩',
    surahEn: 'Surah Hud (11:123)',
    page: '৯৯',
    tags: ['Patience', 'Protection', 'Strength'],
    ayahs: [{ surah: 11, ayah: 123 }],
    bnTranslation: 'আকাশমণ্ডলী ও পৃথিবীর অদৃশ্য বিষয়ের (জ্ঞান) আল্লাহ্রই এবং তাঁরই নিকট সমস্ত কিছু প্রত্যাণীত হবে। সুতরাং তাঁর উপাসনা কর এবং তাঁর উপর নির্ভর কর। তোমরা যা কর সে সম্বন্ধে তোমার প্রতিপালক অনবহিত নন।',
    enTranslation: 'God holds the unseen in heaven and earth, and unto Him does every matter return; So serve Him, and rely on Him. Your Lord is not unmindful of what you (all) are doing.',
    benefitsBn: [
      'নফস দমন হবে ও ঈমান দৃঢ় হবে',
      'অন্তরে ঈমানী শক্তি ও সাহস প্রতিষ্ঠিত হবে',
      'বিপদে ধৈর্য ধরা সহজ হবে ও আল্লাহর সাহায্য পাওয়া যাবে'
    ]
  },
  {
    id: 'amal-6',
    chapter: 'amal',
    num: 6,
    labelBn: "আমল-৬ (গভীর ধ্যানে)",
    labelEn: 'Amal 6 (Deep Contemplation)',
    surahBn: 'সূরা রা’দ, ২৮',
    surahEn: "Surah Ar-Ra'd (13:28)",
    page: '১০০',
    tags: ['Peace', 'Healing'],
    ayahs: [{ surah: 13, ayah: 28 }],
    bnTranslation: 'যারা বিশ্বাস স্থাপন করে এবং তাদের অন্তর আল্লাহর জিকির দ্বারা শান্তি লাভ করে; জেনে রাখ—আল্লাহ্র স্মরণেই চিত্ত প্রশান্ত হয়।',
    enTranslation: '"Surely hearts feel tranquil whenever God is mentioned!"',
    benefitsBn: [
      'অন্তর প্রশান্ত হবে এবং ধ্যান গভীরতর হবে',
      'মানসিক রোগ থেকে মুক্ত হওয়া যাবে ও উচ্চ রক্তচাপ প্রশমিত হবে'
    ],
    noteBn: 'গভীর ধ্যানের মধ্যে এই আয়াতটি আমল করার বিশেষ নির্দেশনা রয়েছে।'
  },
  {
    id: 'amal-7',
    chapter: 'amal',
    num: 7,
    labelBn: "আমল-৭",
    labelEn: 'Amal 7',
    surahBn: 'সূরা ত্বা-হা, ৯৮',
    surahEn: 'Surah Ta-Ha (20:98)',
    page: '১০১',
    tags: ['Knowledge', 'Faith'],
    ayahs: [{ surah: 20, ayah: 98 }],
    bnTranslation: 'তোমাদের উপাস্য তো কেবল আল্লাহ্ই, যিনি ব্যতীত অন্য কোনো উপাস্য নেই, তিনি তাঁর জ্ঞানে সব বিষয় বেষ্টন ক’রে আছেন।',
    enTranslation: 'Your God is God (Alone): there is no other deity than Him! He is vaster than everything in knowledge.',
    benefitsBn: [
      'অন্তরে আল্লাহর তাওহীদ জ্ঞান প্রতিষ্ঠিত হবে (যা হলো শ্রেষ্ঠতম জ্ঞান)',
      'অন্তরের লুকানো মোনাফেকি দূর হবে এবং জ্ঞানের অহং ও অন্ধকার দূর হবে'
    ]
  },
  {
    id: 'amal-8',
    chapter: 'amal',
    num: 8,
    labelBn: "আমল-৮",
    labelEn: 'Amal 8',
    surahBn: 'সূরা আম্বীয়া, ২২',
    surahEn: 'Surah Al-Anbiya (21:22)',
    page: '১০২',
    tags: ['Faith', 'Knowledge'],
    ayahs: [{ surah: 21, ayah: 22 }],
    bnTranslation: 'যদি আল্লাহ্ ব্যতীত আকাশমণ্ডলী ও পৃথিবীতে বহু উপাস্য থাকত তবে উভয়ই ধ্বংস হয়ে যেত। কিন্তু ওরা যা বলে তার থেকে আরশের অধিপতি আল্লাহ্ পবিত্র, মহান।',
    enTranslation: 'If there were other Gods in either (Heaven or Earth) besides God (Alone), they would both dissolve in chaos. Glory be to God, Lord of the Throne, beyond what they describe!',
    benefitsBn: [
      'অন্তরে আল্লাহর তাওহীদজ্ঞান প্রতিষ্ঠিত হবে',
      'ঈমানের ভ্রান্তি ও আল্লাহ সম্বন্ধে ভ্রান্ত ধারণা মন থেকে দূর হবে'
    ]
  },
  {
    id: 'amal-9',
    chapter: 'amal',
    num: 9,
    labelBn: "আমল-৯ (আয়াতুন নূর)",
    labelEn: 'Amal 9 (Verse of Light)',
    surahBn: 'সূরা নূর, ৩৫',
    surahEn: 'Surah An-Nur (24:35)',
    page: '১০৩–১০৪',
    tags: ['Knowledge', 'Peace', 'Faith'],
    ayahs: [{ surah: 24, ayah: 35 }],
    bnTranslation: 'আল্লাহ্ আকাশমণ্ডলী ও পৃথিবীর আলো; তাঁর আলোর উপমা যেন এক তাকের মতো, যার মধ্যে আছে এক প্রদীপ, প্রদীপটি একটি কাচের আবরণের মধ্যে স্থাপিত, কাচের আবরণটি উজ্জ্বল নক্ষত্র সদৃশ; পবিত্র জায়তুন বৃক্ষের তেল থেকে তা প্রজ্বলিত হয়, যা প্রাচ্যের নয়, প্রতীচ্যেরও নয়, অগ্নিস্পর্শ না করলেও মনে হয় যেন তেল যেন উজ্জ্বল আলো দিচ্ছে; আলোর ওপর আলো! আল্লাহ্ যাকে ইচ্ছা তাঁর আলোর দিকে পথ নির্দেশ করেন।',
    enTranslation: 'God is the light of heaven and earth! His light may be compared to a niche in which there is a lamp; the lamp is in a glass; the glass is just as if it were a glittering star kindled from a blessed olive tree, (which is) neither Eastern nor Western, whose oil will almost glow though fire has never touched it: light upon light, God guides anyone He wishes to His light.',
    benefitsBn: [
      'হৃদয়ে আল্লাহর আলো লাভ হবে এবং অন্তরে আল্লাহ-প্রেম সৃষ্টি হবে',
      'মনের ময়লা কেটে যাবে এবং জ্ঞান বিকশিত হবে'
    ],
    noteBn: 'এই আয়াতটিতে সুন্দরতম উপমায় আল্লাহ নিজেকে বর্ণনা করেছেন।'
  },
  {
    id: 'amal-10',
    chapter: 'amal',
    num: 10,
    labelBn: "আমল-১০ (ঘুমের আগে)",
    labelEn: 'Amal 10 (Before Sleep)',
    surahBn: 'সূরা ক্বাসাস্, ৮৮',
    surahEn: 'Surah Al-Qasas (28:88)',
    page: '১০৫',
    tags: ['Faith', 'Protection'],
    ayahs: [{ surah: 28, ayah: 88 }],
    bnTranslation: 'তুমি আল্লাহ্র সঙ্গে অন্য উপাস্যকে ডেকো না, তিনি ব্যতীত অন্য কোনো উপাস্য নেই। আল্লাহ্র সত্তা ব্যতীত সমস্ত কিছুই ধ্বংসশীল। বিধান তাঁরই এবং তাঁরই নিকট তোমরা প্রত্যাবর্তিত হবে।',
    enTranslation: 'Do not appeal to any other deity along with God: there is no god except Him. Everything is perishable except His face! Discretion belongs to Him, and to Him will you (all) be returned.',
    benefitsBn: [
      'অন্তরে তাওহীদজ্ঞান লাভ হবে, নফসের মিথ্যা অহং কেটে যাবে ও আত্মসমর্পণ সহজ হবে'
    ]
  },
  {
    id: 'amal-11',
    chapter: 'amal',
    num: 11,
    labelBn: "আমল-১১",
    labelEn: 'Amal 11',
    surahBn: 'সূরা শূরা, ১০',
    surahEn: 'Surah Ash-Shura (42:10)',
    page: '১০৬',
    tags: ['Protection', 'Peace'],
    ayahs: [{ surah: 42, ayah: 10 }],
    bnTranslation: 'তোমরা যে বিষয়েই মতভেদ করো না কেন—তার মীমাংসা তো আল্লাহ্রই নিকট; বল, “তিনিই আল্লাহ্—আমার প্রতিপালক; আমি নির্ভর করি তাঁর উপর এবং আমি তাঁরই অভিমুখী।”',
    enTranslation: 'No matter what you (all) may have differed over in any way, its jurisdiction still (remains) up to God. Such is God, my Lord; on Him have I relied and to Him do I refer.',
    benefitsBn: [
      'নফস পরিষ্কার হবে, আল্লাহর ওপর নির্ভরতা বাড়বে এবং বিপদে সাহায্য পাওয়া যাবে'
    ]
  },
  {
    id: 'amal-12',
    chapter: 'amal',
    num: 12,
    labelBn: "আমল-১২ (ঘুমাতে যাওয়ার আগে)",
    labelEn: 'Amal 12 (At Bedtime)',
    surahBn: 'সূরা যুখরুফ, ৮৪–৮৫',
    surahEn: 'Surah Az-Zukhruf (43:84–85)',
    page: '১০৭',
    tags: ['Protection', 'Hereafter'],
    ayahs: [
      { surah: 43, ayah: 84 },
      { surah: 43, ayah: 85 }
    ],
    bnTranslation: 'তিনিই উপাস্য নভোমণ্ডলে, তিনিই উপাস্য ভূমণ্ডলে এবং তিনিই প্রজ্ঞাময়, সর্বজ্ঞ। কত মহান তিনি যিনি আকাশমণ্ডলী, পৃথিবী এবং ওদের মধ্যবর্তী সমস্ত কিছুর সার্বভৌম অধিপতি! কিয়ামতের জ্ঞান কেবল তাঁরই আছে এবং তাঁরই নিকট তোমরা প্রত্যাবর্তিত হবে।',
    enTranslation: 'He alone is God in heaven and God on Earth; He is the Wise, Aware. Blessed is He Who holds control over heaven and earth, and anything in between them. He has knowledge of the Hour and to Him will you be returned.',
    benefitsBn: [
      'অন্তরে আল্লাহর ভয় ও চেতনা জাগ্রত থাকবে এবং নিজেকে সুরক্ষিত মনে হবে'
    ],
    noteBn: 'ঘুমাতে যাওয়ার আগে নির্বিষ্টমনে পাঠ করা উচিত।'
  },
  {
    id: 'amal-13',
    chapter: 'amal',
    num: 13,
    labelBn: "আমল-১৩ (ঘুমানোর সময়)",
    labelEn: 'Amal 13 (At Sleep)',
    surahBn: 'সূরা হাশর, ২২',
    surahEn: 'Surah Al-Hashr (59:22)',
    page: '১০৮',
    tags: ['Knowledge', 'Peace'],
    ayahs: [{ surah: 59, ayah: 22 }],
    bnTranslation: 'তিনিই আল্লাহ্, তিনি ব্যতীত কোনো উপাস্য নেই, তিনি অদৃশ্য ও দৃশ্যের পরিজ্ঞাতা, তিনি দয়াময়, পরম দয়ালু।',
    enTranslation: 'He is God, besides Whom there is no (other) deity: knowing the unseen and the visible, He is the Mercy giving, the Merciful!',
    benefitsBn: [
      'জ্ঞানলাভ হবে এবং জ্ঞানের অকলুষতা শুদ্ধ হয়ে যাবে'
    ]
  },

  // ==========================================================================
  // CHAPTER 4: 11 SPECIAL AMALS FOR INCREASING IMAN (১ - ১১)
  // ==========================================================================
  {
    id: 'iman-1',
    chapter: 'iman_amal',
    num: 1,
    labelBn: 'বিশেষ আমল-১',
    labelEn: 'Special Amal 1',
    surahBn: 'সূরা হূদ, ১১৪',
    surahEn: 'Surah Hud (11:114)',
    page: '১০৯',
    tags: ['Faith', 'Forgiveness'],
    ayahs: [{ surah: 11, ayah: 114 }],
    bnTranslation: 'নামায কায়েম কর দিবসের দুই প্রান্তভাগে ও রাতের প্রথমভাগে। সৎকর্ম অবশ্যই অসৎকর্মকে দূর করে দেয়। যারা উপদেশ গ্রহণ করে এ তাদের জন্য এক উপদেশ।',
    enTranslation: 'Keep up prayer at both ends of the day, and at the approach of night. Good deeds remove evil deeds: that is a reminder for such persons as will be reminded.',
    benefitsBn: ['ঈমান বৃদ্ধি ও পাপ মোচনের অন্যতম মূলনীতি—সৎকর্ম দ্বারা অসৎকর্ম দূর করা।']
  },
  {
    id: 'iman-2',
    chapter: 'iman_amal',
    num: 2,
    labelBn: 'বিশেষ আমল-২ (আয়াতে সিজদাহ)',
    labelEn: 'Special Amal 2 (Sajdah Verse)',
    surahBn: 'সূরা হজ্ব, ৭৭',
    surahEn: 'Surah Al-Hajj (22:77)',
    page: '১১০',
    isSajdah: true,
    tags: ['Faith', 'Prosperity'],
    ayahs: [{ surah: 22, ayah: 77 }],
    bnTranslation: 'হে বিশ্বাসীগণ! তোমরা রুকূ কর, সিজদা কর এবং তোমাদের প্রতিপালকের উপাসনা কর ও সৎকাজ কর যাতে তোমরা সফলকাম হতে পার।',
    enTranslation: 'You who believe, bow and kneel before (Him), and worship your Lord; and do good, so that you may succeed.',
    benefitsBn: ['রুকূ, সিজদা, ইবাদত ও সৎকর্মের মাধ্যমে ইহকাল ও পরকালের সফলতা লাভ।']
  },
  {
    id: 'iman-3',
    chapter: 'iman_amal',
    num: 3,
    labelBn: 'বিশেষ আমল-৩',
    labelEn: 'Special Amal 3',
    surahBn: 'সূরা নিসা, ৮৭',
    surahEn: 'Surah An-Nisa (4:87)',
    page: '১১০',
    tags: ['Faith', 'Hereafter'],
    ayahs: [{ surah: 4, ayah: 87 }],
    bnTranslation: 'আল্লাহ্ ছাড়া অন্য কোনো উপাস্য নেই, নিশ্চয়ই তিনি তোমাদেরকে শেষ বিচারের দিন একত্র করবেন এতে কোনো সন্দেহ নেই। কে আছে আল্লাহ্ অপেক্ষা অধিক সত্যবাদী?',
    enTranslation: 'God! there is no deity except Him. He will bring you all together on Resurrection Day—There is no doubt about it. Who is more reliable than God as a Narrator?',
    benefitsBn: ['তাওহীদ ও পুনরুত্থান দিবসের অকাট্য সত্যতায় ঈমান সুদৃঢ় করা।']
  },
  {
    id: 'iman-4',
    chapter: 'iman_amal',
    num: 4,
    labelBn: 'বিশেষ আমল-৪ (আয়াতে সিজদাহ)',
    labelEn: 'Special Amal 4 (Sajdah Verse)',
    surahBn: 'সূরা আ’রাফ, ২০৬',
    surahEn: "Surah Al-A'raf (7:206)",
    page: '১১১',
    isSajdah: true,
    tags: ['Faith', 'Peace'],
    ayahs: [{ surah: 7, ayah: 206 }],
    bnTranslation: 'নিশ্চয়ই যারা তোমার প্রতিপালকের সান্নিধ্যে রয়েছে তারা অহংকারে তাঁর উপাসনায় বিমুখ হয় না ও তাঁরই মহিমা ঘোষণা করে এবং তাঁরই নিকট তারা সিজদাবনত হয়।',
    enTranslation: 'Those who are with your Lord do not feel too proud to worship Him; they glorify Him and drop down on their knees before Him.',
    benefitsBn: ['অহংকারমুক্ত হয়ে আল্লাহর তাসবীহ ও সিজদায় বিনয়ী হওয়ার শিক্ষা।']
  },
  {
    id: 'iman-5',
    chapter: 'iman_amal',
    num: 5,
    labelBn: 'বিশেষ আমল-৫',
    labelEn: 'Special Amal 5',
    surahBn: 'সূরা ইব্রাহীম, ৫২',
    surahEn: 'Surah Ibrahim (14:52)',
    page: '১১১–১১২',
    tags: ['Faith', 'Knowledge'],
    ayahs: [{ surah: 14, ayah: 52 }],
    bnTranslation: 'এ মানুষের জন্য এক বার্তা যাতে এ দ্বারা ওরা সতর্ক হয় এবং জানতে পারে যে তিনি একমাত্র উপাস্য এবং যাতে বোধশক্তি সম্পন্নেরা উপদেশ গ্রহণ করে।',
    enTranslation: 'This is a proclamation for mankind; let them feel they are warned through it and know that He is God alone. May prudent persons bear it in mind!',
    benefitsBn: ['কোরআনের সতর্কবার্তা ও একত্ববাদের উপলব্ধি জাগ্রত করা।']
  },
  {
    id: 'iman-6',
    chapter: 'iman_amal',
    num: 6,
    labelBn: 'বিশেষ আমল-৬',
    labelEn: 'Special Amal 6',
    surahBn: 'সূরা বনি-ইসরাইল, ৮১',
    surahEn: "Surah Bani Isra'il / Al-Isra (17:81)",
    page: '১১২',
    tags: ['Strength', 'Faith'],
    ayahs: [{ surah: 17, ayah: 81 }],
    bnTranslation: 'বল, “সত্য এসেছে এবং মিথ্যা বিলুপ্ত হয়েছে, নিশ্চয়ই মিথ্যা বিলুপ্ত হবে।”',
    enTranslation: 'And say (too): Truth has come and falsehood vanished; falsehood is so perishable!',
    benefitsBn: ['সত্যের বিজয় ও মিথ্যার অনিবার্য বিনাশের ওপর অটল বিশ্বাস স্থাপন।']
  },
  {
    id: 'iman-7',
    chapter: 'iman_amal',
    num: 7,
    labelBn: 'বিশেষ আমল-৭',
    labelEn: 'Special Amal 7',
    surahBn: 'সূরা মরিয়ম, ৭৬',
    surahEn: 'Surah Maryam (19:76)',
    page: '১১২–১১৩',
    tags: ['Faith', 'Prosperity'],
    ayahs: [{ surah: 19, ayah: 76 }],
    bnTranslation: 'এবং যারা সৎপথে চলে আল্লাহ্ তাদের পথপ্রাপ্তিতে বৃদ্ধি দান করেন এবং স্থায়ী সৎকর্ম, যার ফল স্থায়ী, তা তোমার প্রতিপালকের পুরস্কার প্রাপ্তির জন্য শ্রেষ্ঠ এবং পরিণাম হিসেবেও শ্রেষ্ঠ।',
    enTranslation: 'God increases guidance for those who have consented to be guided, while honorable deeds that endure are best with your Lord as a recompense and yield the best returns.',
    benefitsBn: ['সৎপথে চলার মাধ্যমে হেদায়াত বৃদ্ধি ও স্থায়ী সৎকর্মের সর্বোত্তম প্রতিদান লাভ।']
  },
  {
    id: 'iman-8',
    chapter: 'iman_amal',
    num: 8,
    labelBn: 'বিশেষ আমল-৮',
    labelEn: 'Special Amal 8',
    surahBn: 'সূরা আনক্বাবূত, ৬৯',
    surahEn: "Surah Al-'Ankabut (29:69)",
    page: '১১৩',
    tags: ['Strength', 'Faith'],
    ayahs: [{ surah: 29, ayah: 69 }],
    bnTranslation: 'যারা আমার উদ্দেশ্যে সংগ্রাম করে আমি তাদের অবশ্যই আমার পথে পরিচালিত করব। আল্লাহ্ অবশ্যই সৎকর্মপরায়ণদের সঙ্গেই থাকেন।',
    enTranslation: 'We shall guide the ones who strive for Us along Our ways. God stands by those who act kindly!',
    benefitsBn: ['আল্লাহর পথে সাধনা ও সংগ্রামের বিনিময়ে তাঁর প্রত্যক্ষ দিকনির্দেশনা ও সঙ্গ লাভ।']
  },
  {
    id: 'iman-9',
    chapter: 'iman_amal',
    num: 9,
    labelBn: 'বিশেষ আমল-৯',
    labelEn: 'Special Amal 9',
    surahBn: 'সূরা আহ্‌যাব, ৭২',
    surahEn: 'Surah Al-Ahzab (33:72)',
    page: '১১৩–১১৪',
    tags: ['Knowledge', 'Faith'],
    ayahs: [{ surah: 33, ayah: 72 }],
    bnTranslation: 'নিশ্চয়ই আমি আকাশ, পৃথিবী ও পর্বতমালার প্রতি এ (রূহের, আমিত্বের, প্রেমের, সত্যের) আমানত/দায়িত্ব অর্পণ করতে চেয়েছিলাম, ওরা ভয়ে বহন করতে অস্বীকার করল, কিন্তু মানুষ তা বহন করল। মানুষ তো নিজের প্রতি অতিশয় জুলুম করে থাকে এবং সে অতিশয় অজ্ঞ।',
    enTranslation: 'We offered the trust to Heaven and Earth, and to the mountains too, yet they refused to carry it, and shrank back from it. However, man accepted it; he had been unfair (to himself), ignorant!',
    benefitsBn: ['নিচের আয়াতটি একটি রহস্যময় আয়াত। এটিকে বেশি বেশি আমল করলে নফস দমনের শক্তি বাড়বে।']
  },
  {
    id: 'iman-10',
    chapter: 'iman_amal',
    num: 10,
    labelBn: 'বিশেষ আমল-১০',
    labelEn: 'Special Amal 10',
    surahBn: 'সূরা হা-মীম্ সিজদাহ, ৫৪',
    surahEn: 'Surah Ha-Mim Sajdah / Fussilat (41:54)',
    page: '১১৪–১১৫',
    tags: ['Faith', 'Hereafter'],
    ayahs: [{ surah: 41, ayah: 54 }],
    bnTranslation: 'জেনে রাখ, এরা এদের প্রতিপালকের সাথে সাক্ষাৎকারে সন্দিহান, জেনে রাখ সব কিছুকে আল্লাহ্ পরিবেষ্টন করে রয়েছেন।',
    enTranslation: 'Still they (remain) in a quandary about meeting their Lord! Yet He is the One Who embraces everything!',
    benefitsBn: ['এই আয়াতটি আমল করলে নফসের প্রশ্ন বিলুপ্ত হবে।']
  },
  {
    id: 'iman-11',
    chapter: 'iman_amal',
    num: 11,
    labelBn: 'বিশেষ আমল-১১ (আয়াতে সিজদাহ)',
    labelEn: 'Special Amal 11 (Sajdah Verse)',
    surahBn: 'সূরা নাজম, ৫৯–৬২',
    surahEn: 'Surah An-Najm (53:59–62)',
    page: '১১৫',
    isSajdah: true,
    tags: ['Faith', 'Peace'],
    ayahs: [
      { surah: 53, ayah: 59 },
      { surah: 53, ayah: 60 },
      { surah: 53, ayah: 61 },
      { surah: 53, ayah: 62 }
    ],
    bnTranslation: 'তোমরা কি এ কথায় বিস্ময়বোধ করছ এবং হাসিঠাট্টা করছ! ক্রন্দন করছ না? তোমরা তো উদাসীন, আল্লাহ্কে সিজদা কর এবং তাঁর উপাসনা কর।',
    enTranslation: 'Are you amazed at this report? You laugh, and do not weep while you hold your heads so high! Bow down on your knees to God and worship (Him)!',
    benefitsBn: ['উদাসীনতা ত্যাগ করে বিনম্র হৃদয়ে আল্লাহকে সিজদা ও ইবাদতের মাধ্যমে ঈমানের পূর্ণতা লাভ।']
  }
];

const SPIRITUAL_GOALS = [
  { id: 'ALL', labelBn: 'সকল বিষয়', labelEn: 'All Themes' },
  { id: 'Forgiveness', labelBn: 'ক্ষমা ও তওবা', labelEn: 'Forgiveness' },
  { id: 'Protection', labelBn: 'বিপদ ও সুরক্ষা', labelEn: 'Protection' },
  { id: 'Peace', labelBn: 'অন্তরের প্রশান্তি', labelEn: 'Inner Peace' },
  { id: 'Prosperity', labelBn: 'সমৃদ্ধি ও রিযিক', labelEn: 'Prosperity' },
  { id: 'Faith', labelBn: 'ঈমান বৃদ্ধি', labelEn: 'Faith & Tawhid' },
  { id: 'Knowledge', labelBn: 'জ্ঞান ও প্রজ্ঞা', labelEn: 'Knowledge' },
  { id: 'Family', labelBn: 'পরিবার ও সন্তান', labelEn: 'Family' },
  { id: 'Healing', labelBn: 'রোগমুক্তি', labelEn: 'Healing' },
  { id: 'Patience', labelBn: 'ধৈর্য ও শক্তি', labelEn: 'Patience & Strength' },
  { id: 'Hereafter', labelBn: 'পরকাল ও নাজাত', labelEn: 'Hereafter' }
];

const PRONUNCIATION_RULES = [
  { symbol: 'হ্ / ’হ', desc: 'আরবি প্রথম "হা"-কে (যা কণ্ঠনালীর গোড়া থেকে উচ্চারিত হয়) নির্দেশ করা হয়েছে।' },
  { symbol: '’আ / ’ই / ’উ', desc: 'উপরে বামে উর্ধ্বকমা দ্বারা আরবি "আইন" (ع)-এর গভীর উচ্চারণ নির্দেশ করা হয়েছে।' },
  { symbol: 'ক্ব', desc: 'কণ্ঠনালীর গোড়া থেকে উচ্চারিত "ক্বাফ" (ق)-কে নির্দেশ করা হয়েছে।' },
  { symbol: 'ছ', desc: 'জিহ্বার আগা ও উপরের পাটির দাঁতের আগার মিলনে হালকাভাবে উচ্চারিত "ছা" (ث)-কে নির্দেশ করা হয়েছে।' },
  { symbol: 'জ্ব', desc: '"জোয়া" (ظ)-এর ভারী উচ্চারণকে নির্দেশ করা হয়েছে।' },
  { symbol: 'জ / য / ঝ', desc: '"জাল" (ذ)-এর জন্য জ, "যিম" (ج)-এর জন্য য এবং "ঝা" (ز)-এর জন্য ঝ ব্যবহৃত হয়েছে।' },
  { symbol: 'কমা (,)', desc: 'শব্দের মধ্যে কমা বিরামচিহ্ন নয়, বরং "হামজাহ্" (ء) নির্দেশক চিহ্ন হিসেবে ব্যবহৃত হয়েছে।' }
];

// Helper: build EveryAyah MP3 URL
const getEveryAyahUrl = (reciterId, surah, ayah) => {
  const s = String(surah).padStart(3, '0');
  const a = String(ayah).padStart(3, '0');
  return `https://everyayah.com/data/${reciterId}/${s}${a}.mp3`;
};

// Helper: convert digits to Bengali numerals
const toBnDigits = (num) => {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => bn[d]);
};

export default function App() {
  // Navigation & UI state
  const [activeChapter, setActiveChapter] = useState('monajat');
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('qmh_lang') || 'bn';
    } catch {
      return 'bn';
    }
  });

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'bn' ? 'en' : 'bn';
      try {
        localStorage.setItem('qmh_lang', next);
      } catch {}
      return next;
    });
  };

  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('ALL');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Display preferences
  const [visibleLayers, setVisibleLayers] = useState({
    arabic: true,
    bengali: true,
    english: true,
    benefits: true
  });
  const [arabicSize, setArabicSize] = useState(28); // px
  const [bengaliSize, setBengaliSize] = useState(17); // px

  // User progress & bookmarks (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('qmh_favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [tasbihCounts, setTasbihCounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('qmh_tasbih') || '{}');
    } catch {
      return {};
    }
  });

  // Arabic Uthmani Text Cache (fetched from api.alquran.cloud)
  const [arabicCache, setArabicCache] = useState({});
  const [loadingChapters, setLoadingChapters] = useState({});

  // Audio Engine State
  const [reciter, setReciter] = useState(RECITERS[0].id);
  const [currentEntryId, setCurrentEntryId] = useState(null);
  const [currentAyahIdx, setCurrentAyahIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [continuousMode, setContinuousMode] = useState(true);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none' | 'one' | 'three'
  const [repeatCounter, setRepeatCounter] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(null);

  const audioRef = useRef(null);
  const cardRefs = useRef({});

  // Persist favorites & tasbih
  useEffect(() => {
    try {
      localStorage.setItem('qmh_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('qmh_tasbih', JSON.stringify(tasbihCounts));
    } catch {}
  }, [tasbihCounts]);

  // Fetch Arabic Uthmani text for entries in active chapter
  useEffect(() => {
    if (activeChapter === 'intro') return;
    const entries = BOOK_ENTRIES.filter((e) => e.chapter === activeChapter);
    const missingPairs = [];

    entries.forEach((entry) => {
      entry.ayahs.forEach(({ surah, ayah }) => {
        const key = `${surah}:${ayah}`;
        if (!arabicCache[key]) {
          missingPairs.push({ surah, ayah, key });
        }
      });
    });

    if (missingPairs.length === 0) return;

    let cancelled = false;
    setLoadingChapters((prev) => ({ ...prev, [activeChapter]: true }));

    Promise.all(
      missingPairs.map(async ({ surah, ayah, key }) => {
        try {
          const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/quran-uthmani`);
          const data = await res.json();
          if (data && data.code === 200 && data.data && data.data.text) {
            return { key, text: data.data.text };
          }
        } catch (err) {
          console.warn('Arabic fetch fallback for', key);
        }
        return { key, text: null };
      })
    ).then((results) => {
      if (cancelled) return;
      setArabicCache((prev) => {
        const next = { ...prev };
        results.forEach(({ key, text }) => {
          if (text) next[key] = text;
        });
        return next;
      });
      setLoadingChapters((prev) => ({ ...prev, [activeChapter]: false }));
    });

    return () => {
      cancelled = true;
    };
  }, [activeChapter, arabicCache]);

  // Filtered entries for current chapter
  const filteredEntries = useMemo(() => {
    return BOOK_ENTRIES.filter((entry) => {
      if (entry.chapter !== activeChapter) return false;
      if (onlyFavorites && !favorites.includes(entry.id)) return false;
      if (selectedGoal !== 'ALL' && !entry.tags.includes(selectedGoal)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBn = entry.bnTranslation.toLowerCase().includes(q) || entry.surahBn.toLowerCase().includes(q) || entry.labelBn.toLowerCase().includes(q);
        const matchEn = entry.enTranslation.toLowerCase().includes(q) || entry.surahEn.toLowerCase().includes(q) || entry.labelEn.toLowerCase().includes(q);
        const matchBenefits = entry.benefitsBn?.some((b) => b.toLowerCase().includes(q));
        return matchBn || matchEn || matchBenefits;
      }
      return true;
    });
  }, [activeChapter, onlyFavorites, favorites, selectedGoal, searchQuery]);

  const currentEntry = useMemo(
    () => BOOK_ENTRIES.find((e) => e.id === currentEntryId) || null,
    [currentEntryId]
  );

  // Scroll active playing card into view smoothly
  useEffect(() => {
    if (currentEntryId && cardRefs.current[currentEntryId]) {
      cardRefs.current[currentEntryId].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentEntryId]);

  // Start playing a specific entry
  const playEntry = useCallback((entryId, ayahIndex = 0) => {
    setAudioError(null);
    if (currentEntryId === entryId && currentAyahIdx === ayahIndex && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }
    setCurrentEntryId(entryId);
    setCurrentAyahIdx(ayahIndex);
    setRepeatCounter(0);
    setIsPlaying(true);
  }, [currentEntryId, currentAyahIdx, isPlaying]);

  // Play entire active chapter from the start
  const playEntireChapter = () => {
    const list = filteredEntries.length > 0 ? filteredEntries : BOOK_ENTRIES.filter((e) => e.chapter === activeChapter);
    if (list.length > 0) {
      setContinuousMode(true);
      playEntry(list[0].id, 0);
    }
  };

  // Sync <audio> element when track, ayah index, or reciter changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentEntry) return;

    const ayahObj = currentEntry.ayahs[currentAyahIdx] || currentEntry.ayahs[0];
    const url = getEveryAyahUrl(reciter, ayahObj.surah, ayahObj.ayah);

    if (audio.src !== url) {
      audio.src = url;
      audio.load();
    }
    audio.playbackRate = playbackRate;
    audio.muted = isMuted;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback prevented or network error:', err);
          setAudioError('অডিও লোড হতে সমস্যা হচ্ছে। অনুগ্রহ করে ইন্টারনেট সংযোগ বা তিলাওয়াতকারী পরিবর্তন করে দেখুন।');
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [currentEntry, currentAyahIdx, reciter, isPlaying]);

  // Update playback rate & mute dynamically without reloading src
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.muted = isMuted;
    }
  }, [playbackRate, isMuted]);

  // Handle when a single ayah MP3 ends
  const handleAyahEnded = () => {
    if (!currentEntry) return;

    // 1. If multi-ayah entry and there are more ayahs in this entry
    if (currentAyahIdx + 1 < currentEntry.ayahs.length) {
      setCurrentAyahIdx((prev) => prev + 1);
      return;
    }

    // 2. Entry finished! Increment tasbih counter automatically
    setTasbihCounts((prev) => ({
      ...prev,
      [currentEntry.id]: (prev[currentEntry.id] || 0) + 1
    }));

    // 3. Check Repeat Mode
    if (repeatMode === 'one') {
      setCurrentAyahIdx(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    if (repeatMode === 'three' && repeatCounter + 1 < 3) {
      setRepeatCounter((prev) => prev + 1);
      setCurrentAyahIdx(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    // 4. Continuous chapter playback
    if (continuousMode) {
      const chapterEntries = BOOK_ENTRIES.filter((e) => e.chapter === currentEntry.chapter);
      const idx = chapterEntries.findIndex((e) => e.id === currentEntry.id);
      if (idx !== -1 && idx + 1 < chapterEntries.length) {
        setCurrentEntryId(chapterEntries[idx + 1].id);
        setCurrentAyahIdx(0);
        setRepeatCounter(0);
        return;
      }
    }

    // Otherwise stop cleanly
    setIsPlaying(false);
    setCurrentAyahIdx(0);
    setRepeatCounter(0);
  };

  const handleNextEntry = () => {
    if (!currentEntry) return;
    const chapterEntries = BOOK_ENTRIES.filter((e) => e.chapter === currentEntry.chapter);
    const idx = chapterEntries.findIndex((e) => e.id === currentEntry.id);
    if (idx !== -1 && idx + 1 < chapterEntries.length) {
      playEntry(chapterEntries[idx + 1].id, 0);
    }
  };

  const handlePrevEntry = () => {
    if (!currentEntry) return;
    const chapterEntries = BOOK_ENTRIES.filter((e) => e.chapter === currentEntry.chapter);
    const idx = chapterEntries.findIndex((e) => e.id === currentEntry.id);
    if (idx > 0) {
      playEntry(chapterEntries[idx - 1].id, 0);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const incrementTasbih = (id) => {
    setTasbihCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const resetTasbih = (id) => {
    setTasbihCounts((prev) => ({
      ...prev,
      [id]: 0
    }));
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cycleRepeatMode = () => {
    setRepeatMode((prev) => (prev === 'none' ? 'three' : prev === 'three' ? 'one' : 'none'));
    setRepeatCounter(0);
  };

  const currentChapterObj = CHAPTERS.find((c) => c.id === activeChapter);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-[#0B1718] text-[#EAE6DC]'
          : 'bg-[#F8FAFC] text-[#152B2E]'
      }`}
    >
      {/* Google Fonts for Authentic Arabic, Bengali, and Serif English Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Hind+Siliguri:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Noto+Serif+Bengali:wght@400;600;700&display=swap');

        .font-arabic {
          font-family: 'Amiri', 'Traditional Arabic', serif;
          line-height: 2.15;
        }
        .font-bn-serif {
          font-family: 'Noto Serif Bengali', 'Hind Siliguri', serif;
        }
        .font-bn-sans {
          font-family: 'Hind Siliguri', sans-serif;
        }
        .font-en-serif {
          font-family: 'Lora', Georgia, serif;
        }

        /* Subtle manuscript geometric pattern */
        .islamic-pattern {
          background-image: radial-gradient(rgba(20, 184, 166, 0.12) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(197, 155, 39, 0.4);
          border-radius: 9999px;
        }
      `}</style>

      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        onEnded={handleAyahEnded}
        onTimeUpdate={(e) => setAudioProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
      />

      {/* =====================================================================
          TOP HEADER BAR
      ===================================================================== */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          darkMode
            ? 'bg-[#0B1718]/90 border-[#1E3C40]'
            : 'bg-[#F8FAFC]/95 border-[#E2E8F0]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#14B8A6]/40 text-[#14B8A6] hover:bg-[#14B8A6]/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F5B63] to-[#15757F] border border-[#14B8A6] flex items-center justify-center shadow-sm text-[#CCFBF1] font-arabic text-xl font-bold">
                ۞
              </div>
              <div>
                <h1 className="font-bn-serif font-bold text-lg sm:text-xl leading-tight tracking-tight text-[#0F5B63] dark:text-[#2DD4BF]">
                  {lang === 'bn' ? 'কোরআনের মোনাজাত এবং হাম্দ' : 'Quraner Monajat & Hamd'}
                </h1>
                <p className="text-xs font-bn-sans opacity-75 hidden sm:block">
                  {lang === 'bn'
                    ? 'সংকলন: এস. এম. জাকির হুসাইন • Interactive Reader & Audio Companion'
                    : 'Compiled by S.M. Zakir Hussain • Interactive Reader & Audio Companion'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Controls: Language Switch, Reciter Dropdown, Typography Settings, Dark Mode */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* English / Bangla Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#14B8A6] bg-[#0F5B63]/10 dark:bg-[#14B8A6]/15 hover:bg-[#0F5B63]/20 dark:hover:bg-[#14B8A6]/25 transition font-semibold text-xs text-[#0F5B63] dark:text-[#5EEAD4] shadow-sm cursor-pointer"
              title={lang === 'bn' ? 'Switch to English version' : 'বাংলা সংস্করণে পরিবর্তন করুন'}
            >
              <Languages size={15} className="text-[#14B8A6]" />
              <span className="font-bold">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Reciter Selector */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#14B8A6]/40 transition ${
              darkMode ? 'bg-[#122528] text-white' : 'bg-white text-[#152B2E] shadow-xs'
            }`}>
              <Volume2 size={16} className="text-[#14B8A6] shrink-0" />
              <select
                value={reciter}
                onChange={(e) => setReciter(e.target.value)}
                className={`bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-1 max-w-[190px] truncate ${
                  darkMode ? 'text-[#EAE6DC]' : 'text-[#152B2E]'
                }`}
                title="Select Quran Reciter"
              >
                {RECITERS.map((r) => (
                  <option
                    key={r.id}
                    value={r.id}
                    className={darkMode ? 'bg-[#0F2124] text-white' : 'bg-white text-[#152B2E]'}
                  >
                    {lang === 'bn' ? r.bnName : r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Settings Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl border transition ${
                showSettings
                  ? 'bg-[#0F5B63] text-white border-[#0F5B63]'
                  : 'border-[#14B8A6]/40 hover:bg-[#14B8A6]/10'
              }`}
              title="Reading & Display Preferences"
            >
              <Settings size={18} />
            </button>

            {/* Dark / Night Reading Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-[#14B8A6]/40 hover:bg-[#14B8A6]/10 transition"
              title={darkMode ? 'Switch to Daylight Parchment Mode' : 'Switch to Night Tahajjud Mode'}
            >
              {darkMode ? <Sun size={18} className="text-[#2DD4BF]" /> : <Moon size={18} className="text-[#0F5B63]" />}
            </button>
          </div>
        </div>

        {/* Expandable Display Settings Drawer */}
        {showSettings && (
          <div
            className={`border-t px-4 py-4 transition-all ${
              darkMode ? 'bg-[#0F2124] border-[#1E3C40]' : 'bg-[#F1F5F9] border-[#E2E8F0]'
            }`}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Layer Visibility Toggles */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Visible Text Layers
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'arabic', label: 'আরবি (Arabic)' },
                    { key: 'bengali', label: 'বাংলা অর্থ' },
                    { key: 'english', label: 'English' },
                    { key: 'benefits', label: 'ফজিলত ও আমল' }
                  ].map((layer) => (
                    <button
                      key={layer.key}
                      onClick={() =>
                        setVisibleLayers((prev) => ({ ...prev, [layer.key]: !prev[layer.key] }))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-bn-sans font-medium border transition flex items-center gap-1.5 ${
                        visibleLayers[layer.key]
                          ? 'bg-[#0F5B63] text-white border-[#0F5B63]'
                          : 'border-[#14B8A6]/40 opacity-65'
                      }`}
                    >
                      {visibleLayers[layer.key] && <Check size={13} />}
                      {layer.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Sliders */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold opacity-75 flex justify-between mb-1">
                    <span>Arabic Size</span>
                    <span>{arabicSize}px</span>
                  </label>
                  <input
                    type="range"
                    min="22"
                    max="42"
                    value={arabicSize}
                    onChange={(e) => setArabicSize(Number(e.target.value))}
                    className="w-full accent-[#0F5B63]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold opacity-75 flex justify-between mb-1">
                    <span>Bengali Size</span>
                    <span>{bengaliSize}px</span>
                  </label>
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={bengaliSize}
                    onChange={(e) => setBengaliSize(Number(e.target.value))}
                    className="w-full accent-[#0F5B63]"
                  />
                </div>
              </div>

              {/* Mobile Reciter Selector + Playback Speed */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold opacity-75">
                  Reciter & Audio Speed ({playbackRate}x)
                </label>
                <div className="flex gap-2">
                  <select
                    value={reciter}
                    onChange={(e) => setReciter(e.target.value)}
                    className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs border border-[#14B8A6]/40 ${
                      darkMode ? 'bg-[#0B1718] text-white' : 'bg-white text-black'
                    }`}
                  >
                    {RECITERS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className={`px-2.5 py-1.5 rounded-lg text-xs border border-[#14B8A6]/40 ${
                      darkMode ? 'bg-[#0B1718] text-white' : 'bg-white text-black'
                    }`}
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1.0x</option>
                    <option value={1.25}>1.25x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          MAIN LAYOUT: SIDEBAR CHAPTER NAVIGATION + CONTENT AREA
      ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-32 flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDEBAR: CHAPTERS & PROGRESS */}
        <aside
          className={`lg:w-72 shrink-0 ${
            mobileMenuOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div
            className={`sticky top-22 rounded-2xl border p-4 shadow-sm ${
              darkMode
                ? 'bg-[#0F2124] border-[#1E3C40]'
                : 'bg-white border-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#14B8A6]/30">
              <span className="font-bn-serif font-bold text-sm uppercase tracking-wider text-[#14B8A6]">
                {lang === 'bn' ? 'সূচিপত্র • Chapters' : 'Index • Chapters'}
              </span>
              <span className="text-xs opacity-70 font-bn-sans">
                {lang === 'bn' ? '৯৬টি আয়াত' : '96 Verses'}
              </span>
            </div>

            <nav className="space-y-2">
              {CHAPTERS.map((chap) => {
                const isActive = activeChapter === chap.id;
                return (
                  <button
                    key={chap.id}
                    onClick={() => {
                      setActiveChapter(chap.id);
                      setMobileMenuOpen(false);
                      setSelectedGoal('ALL');
                      setOnlyFavorites(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-[#0F5B63] text-[#F8FAFC] border-[#14B8A6] shadow-md'
                        : darkMode
                        ? 'border-transparent hover:bg-[#163135]'
                        : 'border-transparent hover:bg-[#F0FDFA]'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bn-serif font-bold text-sm shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-[#14B8A6] text-[#0B1718]'
                          : 'bg-[#0F5B63]/10 text-[#0F5B63] dark:bg-[#14B8A6]/20 dark:text-[#2DD4BF]'
                      }`}
                    >
                      {lang === 'bn' ? chap.number : chap.numberEn}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bn-serif font-bold text-sm leading-snug">
                        {lang === 'bn' ? chap.titleBn : chap.titleEn}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 truncate ${
                          isActive ? 'text-[#E2E8F0]' : 'opacity-70'
                        }`}
                      >
                        {lang === 'bn' ? chap.titleEn : chap.titleBn}
                      </div>
                      <span
                        className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-bn-sans ${
                          isActive
                            ? 'bg-white/15 text-[#CCFBF1]'
                            : 'bg-[#14B8A6]/15 text-[#0F766E] dark:text-[#2DD4BF]'
                        }`}
                      >
                        {lang === 'bn' ? chap.countLabel : chap.countLabelEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats / Tasbih Summary */}
            <div className="mt-5 pt-4 border-t border-[#14B8A6]/30 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bn-sans">
                <span className="opacity-75">{lang === 'bn' ? 'সংরক্ষিত দোয়া (Bookmarks):' : 'Saved Bookmarks:'}</span>
                <span className="font-bold text-[#0F5B63] dark:text-[#2DD4BF]">
                  {lang === 'bn' ? `${toBnDigits(favorites.length)} টি` : `${favorites.length} items`}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bn-sans">
                <span className="opacity-75">{lang === 'bn' ? 'মোট তিলাওয়াত (Recitations):' : 'Total Recitations:'}</span>
                <span className="font-bold text-[#0F5B63] dark:text-[#2DD4BF]">
                  {lang === 'bn'
                    ? `${toBnDigits(Object.values(tasbihCounts).reduce((acc, v) => acc + v, 0))} বার`
                    : `${Object.values(tasbihCounts).reduce((acc, v) => acc + v, 0)} times`}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          {/* Chapter Hero Banner */}
          <div
            className={`rounded-2xl border p-5 sm:p-7 mb-6 islamic-pattern relative overflow-hidden ${
              darkMode
                ? 'bg-gradient-to-br from-[#0E2326] to-[#0D1B1D] border-[#23474C]'
                : 'bg-gradient-to-br from-[#FFFFFF] to-[#F1F5F9] border-[#CBD5E1]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bn-sans font-semibold bg-[#14B8A6]/15 text-[#0F766E] dark:text-[#2DD4BF] border border-[#14B8A6]/30 mb-2">
                  <Sparkles size={13} />
                  <span>
                    {lang === 'bn'
                      ? `পর্ব ${currentChapterObj?.number} • ${currentChapterObj?.countLabel}`
                      : `Chapter ${currentChapterObj?.numberEn} • ${currentChapterObj?.countLabelEn}`}
                  </span>
                </div>
                <h2 className="font-bn-serif font-bold text-2xl sm:text-3xl text-[#0F5B63] dark:text-[#5EEAD4]">
                  {lang === 'bn' ? currentChapterObj?.titleBn : currentChapterObj?.titleEn}
                </h2>
                <p className="font-en-serif italic text-sm opacity-80 mt-0.5">
                  {lang === 'bn' ? currentChapterObj?.titleEn : currentChapterObj?.titleBn}
                </p>
                <p className="font-bn-sans text-sm opacity-85 mt-2 max-w-2xl">
                  {lang === 'bn' ? currentChapterObj?.subtitleBn : currentChapterObj?.subtitleEn}
                </p>
              </div>

              {activeChapter !== 'intro' && (
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={playEntireChapter}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F5B63] hover:bg-[#13707B] text-white font-bn-sans font-semibold text-sm shadow-md border border-[#14B8A6]/50 transition cursor-pointer"
                  >
                    <ListMusic size={18} className="text-[#2DD4BF]" />
                    <span>{lang === 'bn' ? 'সম্পূর্ণ পর্ব শুনুন (Play All)' : 'Play Full Chapter'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* =================================================================
              CHAPTER 0: INTRODUCTION & PRONUNCIATION GUIDE
          ================================================================= */}
          {activeChapter === 'intro' ? (
            <div className="space-y-6">
              {/* Author's Preface Card */}
              <section
                className={`rounded-2xl border p-6 shadow-sm ${
                  darkMode
                    ? 'bg-[#0F2124] border-[#1E3C40]'
                    : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center gap-2.5 text-[#0F5B63] dark:text-[#2DD4BF] mb-3">
                  <BookOpen size={20} />
                  <h3 className="font-bn-serif font-bold text-xl">
                    ভূমিকা (Author’s Preface)
                  </h3>
                </div>
                <p className="font-arabic text-xl text-center py-3 text-[#0F5B63] dark:text-[#2DD4BF]">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                {lang === 'bn' ? (
                  <div className="space-y-3 font-bn-sans text-base leading-relaxed opacity-90">
                    <p>
                      শুধু প্রার্থনা করলেই চলে না, তার আগে <strong>তওবা</strong> এবং পরে{' '}
                      <strong>আল্লাহর প্রশংসা (হামদ)</strong> না করলে এবং{' '}
                      <strong>রাসূল (সা.)-এর কাছে দরূদ</strong> না পাঠালে তা কবুল হয় না। তাছাড়া
                      হালাল রুজি, ধৈর্য ও জবান-নিয়ন্ত্রণ এসবের ব্যাপার তো আছেই।
                    </p>
                    <p>
                      এ কারণে এই বইতে কোরআন থেকে এমন আয়াতগুলো সংকলন করা হয়েছে যেগুলিতে
                      আল্লাহ পাক নিজেই নিজের প্রশংসা করেছেন এবং যে ভাষায় তিনি আমাদের প্রার্থনা
                      করতে শিখিয়েছেন। আল্লাহর শেখানো ভাষাতে তাঁর কাছে প্রার্থনা করলে এবং তাঁর
                      শেখানো ভাষাতে প্রশংসা করলে তিনি সবচেয়ে বেশি খুশি হন।
                    </p>
                    <p className="text-sm italic opacity-75 pt-2 border-t border-[#14B8A6]/20">
                      — বিনীত, এস. এম. জাকির হুসাইন (ফেব্রুয়ারি ২০০২, ঢাকা)
                    </p>
                    <div className="pt-3">
                      <a
                        href="https://www.rokomari.com/book/9222/quraner-monajat-and-hamd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#14B8A6] hover:bg-[#B38A1F] text-[#0B1718] transition shadow-sm"
                      >
                        <ShoppingBag size={14} />
                        <span>মূল বইটি রকমারি থেকে সংগ্রহ করুন (Order on Rokomari)</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 font-en-serif text-base leading-relaxed opacity-90">
                    <p>
                      Mere petitioning is not enough. Without preceding repentance (<strong>Tawbah</strong>),
                      subsequent praise of Allah (<strong>Hamd</strong>), and blessings upon the
                      Messenger (peace be upon him) (<strong>Durood</strong>), supplications remain incomplete.
                      Sincerity, lawful sustenance (Halal livelihood), patience, and guarding the tongue are equally vital.
                    </p>
                    <p>
                      Therefore, this book compiles the selected Quranic verses wherein Allah the Almighty
                      praises Himself and instructs us in the very words to supplicate unto Him. Praying and praising
                      Allah in the words He Himself revealed is the most beloved to Him.
                    </p>
                    <p className="text-sm italic opacity-75 pt-2 border-t border-[#14B8A6]/20">
                      — S. M. Zakir Hussain (February 2002, Dhaka)
                    </p>
                    <div className="pt-3 font-sans">
                      <a
                        href="https://www.rokomari.com/book/9222/quraner-monajat-and-hamd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#14B8A6] hover:bg-[#B38A1F] text-[#0B1718] transition shadow-sm"
                      >
                        <ShoppingBag size={14} />
                        <span>Order Original Physical Book on Rokomari</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}
              </section>

              {/* Golden Etiquette of Supplication */}
              <section
                className={`rounded-2xl border p-6 shadow-sm ${
                  darkMode
                    ? 'bg-[#0F2124] border-[#1E3C40]'
                    : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <h3 className="font-bn-serif font-bold text-lg text-[#0F5B63] dark:text-[#2DD4BF] mb-4">
                  {lang === 'bn' ? 'দোয়া কবুলের ধারাবাহিক আদব (Recommended Sequence)' : 'Recommended Sequence of Supplication'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      stepBn: '১. তওবা ও ইস্তেগফার',
                      stepEn: '1. Repentance & Seeking Forgiveness (Istighfar)',
                      descBn: 'প্রার্থনার শুরুতে নিজের গুনাহ স্বীকার করে খাঁটি মনে ক্ষমা প্রার্থনা করা।',
                      descEn: 'Commence by acknowledging your sins and seeking sincere repentance from Allah.'
                    },
                    {
                      stepBn: '২. হামদ ও প্রশংসা',
                      stepEn: '2. Praise & Glorification (Hamd)',
                      descBn: 'পর্ব-২ এর আয়াতগুলোর মাধ্যমে আল্লাহর মহিমা ও প্রশংসা পাঠ করা।',
                      descEn: 'Recite verses from Chapter 2 to glorify Allah with the praises He loves.'
                    },
                    {
                      stepBn: '৩. দরূদ শরীফ',
                      stepEn: '3. Blessings upon the Prophet (Durood)',
                      descBn: 'প্রিয় নবী হযরত মুহাম্মদ (সা.)-এর প্রতি দরূদ ও সালাম পেশ করা।',
                      descEn: 'Send sincere blessings and peace upon our beloved Prophet Muhammad (ﷺ).'
                    },
                    {
                      stepBn: '৪. কোরআনিক মোনাজাত',
                      stepEn: '4. Quranic Supplication (Monajat)',
                      descBn: 'অত্যন্ত বিনয় ও আত্মসমর্পণ নিয়ে ২৭টি মোনাজাত নিবেদন করা।',
                      descEn: 'Humbly present the 27 divine supplications with deep humility and submission.'
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border ${
                        darkMode
                          ? 'bg-[#0B1718] border-[#1E3C40]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0]'
                      }`}
                    >
                      <div className="font-bn-serif font-bold text-sm text-[#14B8A6] mb-1">
                        {lang === 'bn' ? item.stepBn : item.stepEn}
                      </div>
                      <p className="font-bn-sans text-xs leading-relaxed opacity-85">
                        {lang === 'bn' ? item.descBn : item.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pronunciation Guide Table */}
              <section
                className={`rounded-2xl border p-6 shadow-sm ${
                  darkMode
                    ? 'bg-[#0F2124] border-[#1E3C40]'
                    : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <h3 className="font-bn-serif font-bold text-lg text-[#0F5B63] dark:text-[#2DD4BF] mb-2">
                  উচ্চারণ নির্দেশিকা (Transliteration Guide)
                </h3>
                <p className="font-bn-sans text-sm opacity-80 mb-4">
                  {lang === 'bn'
                    ? 'বাংলায় আরবি উচ্চারণের ভুল এড়ানোর জন্য বইটিতে ব্যবহৃত বিশেষ চিহ্নসমূহ:'
                    : 'Special phonetic symbols used in the original book to ensure accurate transliteration:'}
                </p>
                <div className="divide-y divide-[#14B8A6]/20">
                  {PRONUNCIATION_RULES.map((rule, idx) => (
                    <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="inline-block w-36 shrink-0 font-bn-serif font-bold text-base text-[#0F5B63] dark:text-[#2DD4BF]">
                        {rule.symbol}
                      </span>
                      <span className="font-bn-sans text-sm opacity-90">{rule.desc}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            /* =================================================================
               CHAPTERS 1–4: SEARCH, FILTER BAR & VERSES LIST
            ================================================================= */
            <>
              {/* Search & Spiritual Goal Filter Bar */}
              <div
                className={`rounded-2xl border p-4 mb-6 space-y-3 ${
                  darkMode
                    ? 'bg-[#0F2124] border-[#1E3C40]'
                    : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        lang === 'bn'
                          ? 'সূরার নাম, অর্থ বা ফজিলত খুঁজুন (যেমন: বাকারাহ, ক্ষমা, ধৈর্য, সন্তান, শান্তি)...'
                          : 'Search by surah name, meaning, or topic (e.g. Baqarah, forgiveness, patience)...'
                      }
                      className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm font-bn-sans border focus:outline-none focus:border-[#14B8A6] ${
                        darkMode
                          ? 'bg-[#0B1718] border-[#1E3C40] text-white'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#152B2E]'
                      }`}
                    />
                  </div>

                  {/* Favorites Filter Toggle */}
                  <button
                    onClick={() => setOnlyFavorites(!onlyFavorites)}
                    className={`px-4 py-2 rounded-xl text-xs font-bn-sans font-semibold border flex items-center justify-center gap-2 transition shrink-0 ${
                      onlyFavorites
                        ? 'bg-[#14B8A6] text-[#0B1718] border-[#14B8A6]'
                        : 'border-[#14B8A6]/40 hover:bg-[#14B8A6]/10'
                    }`}
                  >
                    <Bookmark size={15} fill={onlyFavorites ? 'currentColor' : 'none'} />
                    <span>
                      {lang === 'bn'
                        ? `সংরক্ষিত (${toBnDigits(favorites.length)})`
                        : `Saved (${favorites.length})`}
                    </span>
                  </button>
                </div>

                {/* Spiritual Theme Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {SPIRITUAL_GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bn-sans whitespace-nowrap border transition ${
                        selectedGoal === goal.id
                          ? 'bg-[#0F5B63] text-white border-[#0F5B63]'
                          : 'border-[#14B8A6]/30 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {lang === 'bn' ? goal.labelBn : goal.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verses Cards List */}
              {filteredEntries.length === 0 ? (
                <div
                  className={`rounded-2xl border p-12 text-center ${
                    darkMode
                      ? 'bg-[#0F2124] border-[#1E3C40]'
                      : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <p className="font-bn-serif text-lg opacity-75">
                    {lang === 'bn'
                      ? 'এই ফিল্টারে কোনো আয়াত পাওয়া যায়নি।'
                      : 'No verses found matching this criteria.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGoal('ALL');
                      setOnlyFavorites(false);
                    }}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0F5B63] text-white cursor-pointer"
                  >
                    {lang === 'bn' ? 'সব আয়াত দেখুন (Reset Filters)' : 'View All Verses (Reset Filters)'}
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredEntries.map((entry) => {
                    const isThisPlaying = currentEntryId === entry.id && isPlaying;
                    const isThisSelected = currentEntryId === entry.id;
                    const isFav = favorites.includes(entry.id);
                    const count = tasbihCounts[entry.id] || 0;

                    return (
                      <article
                        key={entry.id}
                        ref={(el) => (cardRefs.current[entry.id] = el)}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                          isThisSelected
                            ? darkMode
                              ? 'bg-[#12282C] border-[#14B8A6] shadow-lg shadow-[#14B8A6]/10'
                              : 'bg-[#FFFFFF] border-[#14B8A6] shadow-lg shadow-[#14B8A6]/15'
                            : darkMode
                            ? 'bg-[#0F2124] border-[#1E3C40] hover:border-[#395B4D]'
                            : 'bg-white border-[#E2E8F0] hover:border-[#14B8A6]/60 shadow-sm'
                        }`}
                      >
                        {/* Card Top Header */}
                        <div
                          className={`px-5 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
                            darkMode
                              ? 'bg-[#0D1B1D]/60 border-[#1E3C40]'
                              : 'bg-[#F8FAFC] border-[#E2E8F0]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Play / Pause Button */}
                            <button
                              onClick={() => playEntry(entry.id, 0)}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm cursor-pointer ${
                                isThisPlaying
                                  ? 'bg-[#14B8A6] text-[#0B1718]'
                                  : 'bg-[#0F5B63] text-white hover:bg-[#13707B]'
                              }`}
                              title={isThisPlaying ? 'Pause Recitation' : 'Play Recitation'}
                            >
                              {isThisPlaying ? (
                                <Pause size={18} fill="currentColor" />
                              ) : (
                                <Play size={18} fill="currentColor" className="ml-0.5" />
                              )}
                            </button>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bn-serif font-bold text-base sm:text-lg text-[#0F5B63] dark:text-[#5EEAD4]">
                                  {lang === 'bn' ? entry.labelBn : entry.labelEn}
                                </span>
                                <span className="text-xs px-2.5 py-0.5 rounded-full font-bn-sans font-medium bg-[#0F5B63]/10 text-[#0F5B63] dark:bg-[#14B8A6]/20 dark:text-[#2DD4BF]">
                                  {lang === 'bn' ? entry.surahBn : entry.surahEn}
                                </span>
                                {entry.isSajdah && (
                                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bn-sans font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                                    {lang === 'bn' ? '۩ আয়াতে সিজদাহ' : '۩ Sajdah Verse'}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs opacity-70 font-en-serif">
                                {lang === 'bn'
                                  ? `${entry.labelEn} • ${entry.surahEn} • পৃষ্ঠা ${entry.page}`
                                  : `${entry.labelBn} • ${entry.surahBn} • Page ${entry.page}`}
                              </div>
                            </div>
                          </div>

                          {/* Card Actions: Tasbih Counter, Copy, Bookmark */}
                          <div className="flex items-center gap-2">
                            {/* Interactive Tasbih / Recitation Counter */}
                            <div
                              className={`flex items-center rounded-xl border text-xs overflow-hidden ${
                                darkMode
                                  ? 'bg-[#0B1718] border-[#1E3C40]'
                                  : 'bg-white border-[#CBD5E1]'
                              }`}
                            >
                              <button
                                onClick={() => incrementTasbih(entry.id)}
                                className="px-2.5 py-1.5 font-bn-sans font-semibold hover:bg-[#0F5B63]/10 flex items-center gap-1 transition cursor-pointer"
                                title="Click to count recitation (Tasbih)"
                              >
                                <span className="text-[#0F5B63] dark:text-[#2DD4BF]">{lang === 'bn' ? 'পাঠ:' : 'Count:'}</span>
                                <span className="font-bold">{lang === 'bn' ? `${toBnDigits(count)}×` : `${count}×`}</span>
                              </button>
                              {count > 0 && (
                                <button
                                  onClick={() => resetTasbih(entry.id)}
                                  className="px-1.5 py-1.5 opacity-60 hover:opacity-100 border-l border-[#14B8A6]/20"
                                  title="Reset counter"
                                >
                                  <RotateCcw size={12} />
                                </button>
                              )}
                            </div>

                            {/* Copy Verse Button */}
                            <button
                              onClick={() => {
                                const arabicFull = entry.ayahs
                                  .map((a) => arabicCache[`${a.surah}:${a.ayah}`] || '')
                                  .join(' ');
                                const shareText = `${entry.labelBn} (${entry.surahBn})\n${arabicFull}\n\nঅর্থ: ${entry.bnTranslation}\nEnglish: ${entry.enTranslation}`;
                                copyToClipboard(shareText, entry.id);
                              }}
                              className="p-2 rounded-xl border border-[#14B8A6]/30 hover:bg-[#14B8A6]/10 transition"
                              title="Copy Verse & Translation"
                            >
                              {copiedKey === entry.id ? (
                                <Check size={16} className="text-emerald-500" />
                              ) : (
                                <Copy size={16} className="opacity-75" />
                              )}
                            </button>

                            {/* Bookmark Button */}
                            <button
                              onClick={() => toggleFavorite(entry.id)}
                              className={`p-2 rounded-xl border transition ${
                                isFav
                                  ? 'bg-[#14B8A6]/20 border-[#14B8A6] text-[#14B8A6]'
                                  : 'border-[#14B8A6]/30 opacity-75 hover:opacity-100'
                              }`}
                              title={isFav ? 'Remove Bookmark' : 'Save to Favorites'}
                            >
                              <Bookmark size={16} fill={isFav ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </div>

                        {/* Card Body: Arabic, Bengali, English, Spiritual Benefits */}
                        <div className="p-5 sm:p-6 space-y-5">
                          {/* 1. Arabic Text (Uthmani Script with per-ayah highlight during playback) */}
                          {visibleLayers.arabic && (
                            <div
                              dir="rtl"
                              style={{ fontSize: `${arabicSize}px` }}
                              className="font-arabic text-right leading-loose tracking-normal py-2 px-3 rounded-xl bg-[#0F5B63]/[0.03] dark:bg-white/[0.02]"
                            >
                              {entry.ayahs.map((ayahObj, idx) => {
                                const key = `${ayahObj.surah}:${ayahObj.ayah}`;
                                const text = arabicCache[key];
                                const isAyahActive =
                                  isThisSelected && currentAyahIdx === idx;

                                return (
                                  <span
                                    key={key}
                                    onClick={() => playEntry(entry.id, idx)}
                                    title="Click to play from this Ayah"
                                    className={`cursor-pointer rounded-lg px-1 transition-colors ${
                                      isAyahActive
                                        ? 'bg-[#14B8A6]/25 text-[#0F5B63] dark:text-[#99F6E4]'
                                        : 'hover:bg-[#14B8A6]/10'
                                    }`}
                                  >
                                    {text ? (
                                      <>
                                        {text}{' '}
                                        <span className="inline-block text-[#14B8A6] text-[0.75em] mx-1">
                                          ﴿{ayahObj.ayah}﴾
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-sm font-sans opacity-50">
                                        {loadingChapters[activeChapter]
                                          ? 'جاري تحميل الآية...'
                                          : `[আয়াত ${ayahObj.surah}:${ayahObj.ayah}]`}
                                      </span>
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          {/* 2. Bengali Translation */}
                          {visibleLayers.bengali && (
                            <div
                              style={{ fontSize: `${bengaliSize}px` }}
                              className="font-bn-sans leading-relaxed text-[#111827] dark:text-[#EAE6DC]"
                            >
                              <span className="text-xs font-bn-sans font-bold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF] block mb-1">
                                বাংলা অনুবাদ:
                              </span>
                              “{entry.bnTranslation}”
                            </div>
                          )}

                          {/* 3. English Translation */}
                          {visibleLayers.english && (
                            <div className="font-en-serif text-sm sm:text-base leading-relaxed opacity-85 pl-3.5 border-l-2 border-[#14B8A6]">
                              “{entry.enTranslation}”
                            </div>
                          )}

                          {/* 4. Spiritual Benefits & Book Commentary */}
                          {visibleLayers.benefits &&
                            (entry.benefitsBn?.length > 0 || entry.noteBn) && (
                              <div
                                className={`rounded-xl p-4 border text-sm font-bn-sans space-y-2 ${
                                  darkMode
                                    ? 'bg-[#0B1718]/80 border-[#1E3C40]'
                                    : 'bg-[#F8FAFC] border-[#E2E8F0]'
                                }`}
                              >
                                {entry.benefitsBn?.length > 0 && (
                                  <div>
                                    <div className="font-bold text-xs uppercase tracking-wider text-[#0F5B63] dark:text-[#2DD4BF] mb-1.5 flex items-center gap-1.5">
                                      <Sparkles size={13} className="text-[#14B8A6]" />
                                      <span>
                                        {lang === 'bn'
                                          ? 'ফজিলত ও উপকারিতা (Spiritual Benefits):'
                                          : 'Spiritual Benefits & Context:'}
                                      </span>
                                    </div>
                                    <ul className="space-y-1 pl-4 list-disc marker:text-[#14B8A6] opacity-90">
                                      {((lang === 'en' && TRANSLATIONS_EN[entry.id]?.benefitsEn)
                                        ? TRANSLATIONS_EN[entry.id].benefitsEn
                                        : entry.benefitsBn
                                      ).map((b, i) => (
                                        <li key={i}>{b}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {entry.noteBn && (
                                  <div className="pt-2 border-t border-[#14B8A6]/20 text-xs opacity-85 flex items-start gap-2">
                                    <Info
                                      size={14}
                                      className="text-[#14B8A6] shrink-0 mt-0.5"
                                    />
                                    <span>
                                      {(lang === 'en' && TRANSLATIONS_EN[entry.id]?.noteEn)
                                        ? TRANSLATIONS_EN[entry.id].noteEn
                                        : entry.noteBn}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* =====================================================================
          FOOTER WITH PHYSICAL BOOK ORDER LINK
      ===================================================================== */}
      <footer
        className={`border-t py-8 px-4 text-center transition-colors ${
          currentEntry ? 'pb-28 sm:pb-24' : 'pb-12'
        } ${
          darkMode
            ? 'bg-[#0B1718] border-[#1E3C40] text-[#EAE6DC]'
            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#152B2E]'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-sm font-medium opacity-90">
              {lang === 'bn'
                ? 'এস. এম. জাকির হুসাইন সংকলিত মূল মুদ্রিত বইটি সংগ্রহ করতে চান?'
                : 'Looking to purchase the original physical book by S.M. Zakir Hussain?'}
            </span>
            <a
              href="https://www.rokomari.com/book/9222/quraner-monajat-and-hamd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0F5B63] hover:bg-[#13707B] text-white border border-[#14B8A6]/60 shadow-sm transition"
            >
              <ShoppingBag size={15} className="text-[#2DD4BF]" />
              <span>
                {lang === 'bn'
                  ? 'রকমারি থেকে অর্ডার করুন'
                  : 'Order on Rokomari'}
              </span>
              <ExternalLink size={13} className="opacity-80" />
            </a>
          </div>

          <p className="text-xs opacity-60">
            {lang === 'bn'
              ? 'কোরআনের মোনাজাত এবং হাম্দ • অলাভজনক ইসলামিক শিক্ষার উদ্দেশ্যে উন্মুক্ত'
              : 'Quraner Monajat & Hamd • Open educational resource for spiritual reflection'}
          </p>
        </div>
      </footer>

      {/* =====================================================================
          STICKY BOTTOM AUDIO PLAYER BAR
      ===================================================================== */}
      {currentEntry && (
        <div
          className={`fixed bottom-0 inset-x-0 z-50 border-t backdrop-blur-lg shadow-2xl transition-colors ${
            darkMode
              ? 'bg-[#0D1C1E]/95 border-[#14B8A6]/50 text-[#EAE6DC]'
              : 'bg-[#FFFFFF]/95 border-[#14B8A6]/60 text-[#152B2E]'
          }`}
        >
          {/* Interactive Progress Scrub Bar */}
          <div
            className="w-full h-1.5 bg-[#14B8A6]/20 cursor-pointer relative"
            onClick={(e) => {
              if (!audioRef.current || !audioDuration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              audioRef.current.currentTime = ratio * audioDuration;
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#0F5B63] to-[#14B8A6] transition-all duration-150"
              style={{
                width: `${audioDuration ? (audioProgress / audioDuration) * 100 : 0}%`
              }}
            />
          </div>

          {audioError && (
            <div className="bg-red-600/90 text-white text-xs text-center py-1 px-3 font-bn-sans">
              {audioError}
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            {/* Currently Playing Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bn-serif font-bold text-sm sm:text-base truncate text-[#0F5B63] dark:text-[#5EEAD4]">
                  {currentEntry.labelBn}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#0F766E] dark:text-[#2DD4BF] font-bn-sans shrink-0">
                  {currentEntry.surahBn}
                  {currentEntry.ayahs.length > 1 &&
                    ` (${currentAyahIdx + 1}/${currentEntry.ayahs.length})`}
                </span>
              </div>
              <div className="text-xs opacity-70 truncate">
                {RECITERS.find((r) => r.id === reciter)?.name}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handlePrevEntry}
                className="p-2 rounded-full hover:bg-[#14B8A6]/15 transition"
                title="Previous"
              >
                <SkipBack size={18} />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-full bg-[#0F5B63] hover:bg-[#13707B] text-white flex items-center justify-center shadow-md border border-[#14B8A6] transition cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextEntry}
                className="p-2 rounded-full hover:bg-[#14B8A6]/15 transition"
                title="Next"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Loop, Continuous Auto-Advance & Mute Controls */}
            <div className="hidden sm:flex items-center justify-end gap-2 flex-1">
              {/* Repeat Mode */}
              <button
                onClick={cycleRepeatMode}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 transition ${
                  repeatMode !== 'none'
                    ? 'bg-[#14B8A6] text-[#0B1718] border-[#14B8A6]'
                    : 'border-[#14B8A6]/30 opacity-75 hover:opacity-100'
                }`}
                title="Toggle Loop Mode (Off / 3x / Infinite)"
              >
                <Repeat size={14} />
                <span>
                  {repeatMode === 'none'
                    ? 'No Loop'
                    : repeatMode === 'three'
                    ? `3× (${repeatCounter + 1}/3)`
                    : 'Loop ∞'}
                </span>
              </button>

              {/* Continuous Chapter Auto-Advance */}
              <button
                onClick={() => setContinuousMode(!continuousMode)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bn-sans font-semibold border transition ${
                  continuousMode
                    ? 'bg-[#0F5B63] text-white border-[#0F5B63]'
                    : 'border-[#14B8A6]/30 opacity-75'
                }`}
                title="Auto-advance to next prayer in chapter"
              >
                {lang === 'bn' ? 'পরবর্তী আয়াত:' : 'Auto-Next:'} {continuousMode ? 'ON' : 'OFF'}
              </button>

              {/* Mute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg hover:bg-[#14B8A6]/15"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}