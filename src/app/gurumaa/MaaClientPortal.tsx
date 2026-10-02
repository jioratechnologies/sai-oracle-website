"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Heart,
  Eye,
  Flame,
  ShieldCheck,
  Building2,
  Calendar,
  Compass,
  ArrowRight,
  BookOpen,
  HandHeart,
  Sun,
  Quote,
  MapPin,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
} from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";
import FloatingShowcase from "@/components/motion/FloatingShowcase";
import { resolveMediaUrl } from "@/lib/image";

type TabKey = "glorious-life" | "life-sketch" | "teachings" | "meditation" | "discourses" | "miracles";

const TABS: { id: TabKey; label: string; fullTitle: string; hint: string; icon: typeof Sparkles }[] = [
  { id: "glorious-life", label: "Glorious Life", fullTitle: "Glorious Life Journey", hint: "Childhood & Darshan", icon: Sparkles },
  { id: "life-sketch", label: "Life Sketch", fullTitle: "Maa Life Sketch", hint: "Human Values & Path", icon: BookOpen },
  { id: "teachings", label: "Teachings", fullTitle: "Teachings of Maa", hint: "Love & Nishkama Seva", icon: HandHeart },
  { id: "meditation", label: "Meditation", fullTitle: "Maa on Meditation", hint: "Jyoti Dhyana Practice", icon: Sun },
  { id: "discourses", label: "Discourses", fullTitle: "Divine Discourses", hint: "Truth & Dharma Wisdom", icon: Quote },
  { id: "miracles", label: "Divine Miracles", fullTitle: "Miraculous Life of Maa", hint: "8 Documented Leelas", icon: Flame },
];

export const MIRACLE_CATEGORIES = [
  { id: "all", label: "All Sacred Miracles", shortLabel: "All Miracles" },
  { id: "blessings", label: "(1) Lord's Blessings", shortLabel: "(1) Blessings" },
  { id: "prayer", label: "(2) Power of Prayer", shortLabel: "(2) Prayer" },
  { id: "manifestations", label: "(3) Manifestations", shortLabel: "(3) Manifestations" },
  { id: "forms", label: "(4) One as Many", shortLabel: "(4) One as Many" },
  { id: "materialisation", label: "(5) Materialisation", shortLabel: "(5) Materialisation" },
];

export const MIRACLES_LIST = [
  {
    id: "astonishing-miracle",
    categoryKey: "blessings",
    categoryLabel: "(1) The Magic of Lord's Blessings",
    title: "Astonishing Miracle of History: Lingams & Nariyal",
    subtitle: "How Baba Showered His Utmost Blessings on Maa on Her Birthday",
    date: "7 January 2000",
    location: "Satyadeep Sai Universe, Meerut",
    image: "/assets/content/miracles/astonishing-miracle-photo.webp",
    aspect: "aspect-4/3",
    keyQuote: "THIS IS GIFT FOR BELOVED MAA FROM SWAMI ON THIS AUSPICIOUS OCCASION",
    excerpt: "On 7th January 2000, Swami gave a direct shaakshaatkaar birthday gift to beloved Maa — glittering lingams, nariyals, and scattered sacred vibhuti before every single deity in Satyadeep Sai Universe accompanied by a booming celestial voice.",
    paragraphs: [
      "Sai is infinite love. Sathya is what He teaches, Dharma is what He lives, Shanti is the mark of His personality, Prema is His very nature. Love of Sai has no words, and love of Sai for Maa is a relation filled with the eternal fragrance of Purity. 7th January 2000 was one of the most auspicious and memorable days in history, when Swami gave a direct shaakshaatkaar gift to Maa on her birthday.",
      "It was around 5:00 PM in the evening when, as usual, one of the devotees went into the Satyadeep Sai Universe to keep milk as prasad for Swami. As she entered the premises, she was astonished to see scattered vibhuti covering the whole premises of this Universe. She saw that in front of each sacred idol — Bhagwan Ganesh, Shirdi Sai Baba, Lord Hanuman, Lord Durga Maa, Lord Radha-Krishna, and Lord Shankar-Parvati — a holy coconut (nariyal) and a lingam had also been placed.",
      "The whole temple glittered with sparkling rays emanating from these fascinating lingams. This lingodbhavam wonder was a golden period in the history of Sai Leelas — such lingams were never seen on earth before this occasion. All these nariyals and lingams are eternal symbols of Swami's unconditional, pure, and unsullied love for His beloved Maa.",
      "As the devotee witnessed all this, she ran immediately to call Maa. When Maa entered, a divine voice echoed clearly in the ears of everyone present in Satyadeep Sai Universe: \"THIS IS GIFT FOR BELOVED MAA FROM SWAMI ON THIS AUSPICIOUS OCCASION.\" Everyone wept tears of holy love, tangibly feeling Swami's omnipresence. Baba's pure, unconditional love towards His ardent devotee Maa was clearly depicted. That entire night, bhajans were sung in the temple to express gratitude and love for Bhagwan.",
      "Today, all these beautiful sacred Lingams and Nariyals are enshrined for eternal darshan in the Sarva Dharma Sthal at Satyadeep Sai Universe. The sacred vibhuti gifted by Swami was distributed by Maa among all devotees present as Swami's prasad. Furthermore, on 14th January 2000 (Makar Sankranti), another 54 lingams and nariyals were distributed as prasad among the devotees by Maa."
    ],
    relicNote: "Enshrined today in Sarva Dharma Sthal at Satyadeep Sai Universe for public darshan.",
  },
  {
    id: "singhasan-miracle",
    categoryKey: "prayer",
    categoryLabel: "(2) The Power of Prayer",
    title: "The Swami Singhasan Miracle",
    subtitle: "How Swami Listened to Maa's Prayer and Gifted a Beautiful Singhasan for His Bhajan Room",
    date: "Delhi & Meerut",
    location: "Swami's Bhajan Hall, Meerut",
    image: "/assets/content/miracles/swami-singhasan-miracle.jpeg",
    aspect: "aspect-4/3",
    keyQuote: "Oh Lord, the Bhagwan of this Universe, You listened to such a small prayer of mine to sit upon this Singhasan!",
    excerpt: "Bhagwan always reminds us that pure karmas and sincere prayers move the Divine. When Maa journeyed with Dr. Nilima Aren to Kirti Nagar Delhi seeking a throne for Baba, Swami sat physically upon the chosen Singhasan, blessed the shopkeeper, and granted him a multi-crore contract overnight.",
    paragraphs: [
      "Bhagwan Sai Baba always says that whatever man does, its impact always befalls him. Good actions yield good results; bad actions yield bad results. 'Man is born in karma, man is grown in karma, man dies in karma. Karma is a guiding force in the life of human beings. It is only karmas that bring pleasure and pain in this world. Your entire life is dependent on your karmas.' Such were the pure karmas and devotion of Maa that she was blessed with such an unforgettable experience of Lord Swami.",
      "For many days, Maa carried a persistent feeling in her heart to bring a beautiful, royal Singhasan for beloved Swami for the bhajan hall. Maa, along with her friend Dr. Nilima Aren, travelled to Delhi to purchase one, though both were unfamiliar with where to find such a throne. Someone suggested going to Kirti Nagar, Delhi. However, Kirti Nagar was an enormous wooden furniture market, making locating an authentic sacred Singhasan a daunting challenge.",
      "Suddenly, the driver stopped the car on one side so they could search. Maa stepped straight into the furniture shop where the car was parked. Inside, she saw a series of beautifully built thrones. One particular Singhasan appeared exceedingly beautiful to Maa. Gazing at it, Maa thought silently in her heart: \"Swami, how beautiful and radiant will You look when You sit upon this Singhasan!\" Thinking this, she walked forward.",
      "The shop owner was initially away, but soon approached them asking what they were seeking. Maa replied that she was looking for a Singhasan for Bhagwan. The owner replied: \"A few days ago, some Sai Baba devotees came here asking for a Singhasan. I told them: Your Sai Baba is too miraculous — if you make your Sai Baba sit over this Singhasan, I will gift it to you free for your Sai Baba!\" Maa replied that she too had come to purchase a Singhasan for Sai Baba. The owner pointed out the one those devotees had chosen — and when Maa looked at that very Singhasan, Swami was sitting saakshaat, physically in flesh and blood, upon that very throne she had loved in her heart!",
      "Maa immediately ran towards Swami and fell at His lotus feet with tears of ecstasy: \"Oh Lord, Bhagwan of this Universe, You listened to such a small prayer of mine to sit upon this Singhasan!\" Seeing this miracle, the shop owner ran forward, his eyes filling with tears of love for Swami — never having witnessed such a wondrous darshan before. Swami remained seated, blessed Maa, and then disappeared.",
      "The shopkeeper declared that this Singhasan would go to Swami's Bhajan Hall in Meerut completely free of cost, along with an ornate custom Chowki. Swami then instructed Maa to convey a personal message to the owner's brother: that Swami is always near and dear to him, even mentioning that the previous night he had broken his car mirror while inebriated. Overcome with amazement, the brother took Swami's photo from his pocket in tears and promised never to drink again.",
      "After cracking a consecrated coconut at the shop entrance, Maa returned home. The very next morning, the owner phoned Maa in utter astonishment: a multi-crore project that had been stalled for years was abruptly cleared and confirmed via fax the minute he opened his doors! The owner personally arranged an air-conditioned car to transport the Singhasan safely to Meerut, installing it with his own hands in Swami's bhajan room, where it is preserved to this day."
    ],
    relicNote: "Preserved today in pristine glory in Swami's Bhajan Hall in Meerut.",
  },
  {
    id: "supreme-blessing",
    categoryKey: "prayer",
    categoryLabel: "(2) The Power of Prayer",
    title: "The Supreme Lord Blessing & Warning",
    subtitle: "How Baba Alerted Beloved Maa and Fortified Her Spirit for Her Great Mission",
    date: "Puttaparthi, 1998",
    location: "Prasanthi Nilayam & Childhood Agra",
    image: "/assets/content/maa/2.webp",
    aspect: "aspect-4/3",
    keyQuote: "A big responsibility is going to come your way; you need not worry, My blessings are with you always.",
    excerpt: "In Puttaparthi at 4:00 AM, Swami showered coins into Maa's palms as a divine premonition of her cosmic responsibilities and upcoming family adversity, revealing that the Lord's ways transcend all scientific comprehension.",
    paragraphs: [
      "In 1998, Maa travelled to Puttaparthi for the sacred darshan of Swami. At around 4:00 AM in the morning, while Maa was sitting in deep dhyana as usual, Swami suddenly granted her saakshaat darshan and instructed her to open her arms.",
      "As soon as Maa held out her arms, Swami showered an abundance of coins into her hands. Seeing this unexpected shower, Maa asked: \"Swami, I never asked You to give me money or coins.\" Swami lovingly replied: \"A big responsibility is going to come your way; you need not worry, My blessings are with you always.\"",
      "When Maa returned home, a sudden family tragedy occurred: elder family members travelling back from Haridwar met with a terrible vehicular accident, and all of them passed away. Swami had given an advance alert to strengthen her soul before destiny took its course. Humans cannot easily decipher divine premonitions, but Swami's leelas are limitless, transcending the boundaries of earthly imagination and science.",
      "From childhood, Swami would often grant her darshan in the fierce form of Kali Maa. When she felt frightened as a young girl, Swami comforted her: \"I am in the form of Maa; why are you getting scared?\" Thereafter, whenever she had the saakshaat darshan of Kali Maa, she conversed with Her without fear, enveloped in Baba's maternal love."
    ],
    relicNote: "Paved the foundation for the establishment of Satyadeep Sai Universe and Mission Karuna.",
  },
  {
    id: "paduka-miracle",
    categoryKey: "manifestations",
    categoryLabel: "(3) Divine Manifestations",
    title: "The Sacred Paduka Miracle",
    subtitle: "How Baba Blessed Maa with His Divine Paduka at Prashanti Nilayam",
    date: "October 1996",
    location: "Prashanti Nilayam & Nathdwara",
    image: "/assets/content/miracles/paduka-miracle-photo.webp",
    aspect: "aspect-4/3",
    keyQuote: "Nathdwara se laaye ho? There, all Padukas are made of My size!",
    excerpt: "Guided by an inner divine voice to procure Padukas from Nathdwara, Maa took them to Prasanthi Nilayam. Swami called out 'Paduka, Paduka', showered rice and kum-kum from His empty hands, and stepped upon them to fit perfectly.",
    paragraphs: [
      "In October 1996, the grand 1008 Paduka Utsav was organized at Prashanti Nilayam from 1st to 4th October. When Maa was in Prashanti Nilayam, Bhagwan Baba awakened an intense, unyielding longing in her heart to procure sacred Padukas for Swami and have them sanctified directly by His divine hands.",
      "It was during the busy festive season of Diwali, and despite searching tirelessly across jewelers, every silver ornament was available except Padukas. In earnest prayer, Maa beseeched Swami for guidance. The very next morning during meditation, an unmistakable sweet celestial voice resonated: \"You will get Padukas from Nathdwara.\"",
      "Next morning early, Maa went to a shopkeeper and asked him to bring Padukas from Nathdwara. The shopkeeper agreed to try, and three days later phoned to say the Padukas had arrived. Maa collected them and took a flight to Puttaparthi for Swami's darshan. Upon arriving on 5th October, she was informed that the 4-day festival had ended on 4th October. Deeply saddened, Maa prayed intensely to Swami, who acknowledged her with a sweet, knowing smile.",
      "The next day, by Swami's grace, Maa was seated in the first row with the ornately decorated Padukas in her hands. When Swami walked past her row, He immediately called out \"Paduka-Paduka!\" with a welcoming smile. Swami waved His empty hand, materialising sacred grains of rice and showering them over the Padukas. He waved His hand again, materialising fragrant kum-kum and showering it over them.",
      "Maa placed the Padukas on the floor and lovingly requested Swami to step onto them. As she looked closely to see if they would fit His feet, Swami burst into laughter: \"Nathdwara se laaye ho? There, all Padukas are made of My size!\" Later she learned that trustees from Nathdwara had previously brought padukas to Baba to test His divinity, and every pair from Nathdwara was divinely proportioned to His holy feet. Ever since, sacred vibhuti and sweet amrit have continuously flowed from photos of Shirdi Sai Baba and Sathya Sai Baba in Maa's presence."
    ],
    relicNote: "The sanctified silver Padukas are preserved and worshipped with great devotion at the temple.",
  },
  {
    id: "vaikunth-darshan",
    categoryKey: "manifestations",
    categoryLabel: "(3) Divine Manifestations",
    title: "Divine Darshan of Vaikunth",
    subtitle: "How Baba Showered His Blessing onto Maa and Took Her to Have Darshan of Vaikunth",
    date: "24 October 1998",
    location: "Celestial Realm of Vaikunth",
    image: "/assets/content/maa/1.webp",
    aspect: "aspect-4/3",
    keyQuote: "Swami asked: 'What more do you want to see?' Maa replied: 'Nothing, Swami — only You.'",
    excerpt: "On 24th October 1998, Swami showed Maa a breathtaking celestial vision beyond human imagination — the realm of Vaikunth with diamond beds upon cosmic waters, Mother Easwaramma, and multi-coloured serpents revealing their Nag-Devta forms.",
    paragraphs: [
      "On 24th October 1998, Bhagwan Swami showed an astonishing creation to beloved Maa that is beyond human imagination — a realm in this universe so exquisitely designed that it can only be described as \"Heaven on Earth\", the holy abode known as VAIKUNTH. Bhagwan appeared before Maa and said: \"Today I will take you to have darshan of Vaikunth.\" Hearing this, Maa was filled with profound joy and anticipation.",
      "Swami guided her into a beautifully designed realm where water stretched in every direction. Floating above that water was a circular bed embedded with radiant diamonds, rotating gently in rhythmic circular motions. Seated upon it was Swami in His resplendent Sai-Krishna Swaroop — a fabulous, indescribable divine form that can only be imagined with a pure heart.",
      "In front of Bhagwan Sri Sathya Sai Baba sat His holy mother, Mother Easwaramma. Swami instructed Maa to sit beside Mother Easwaramma. At once, Swami began taking off the flower garlands He was wearing and tossing them towards Maa's neck; within a moment, her neck was completely adorned with fragrant celestial garlands. Thereafter, Swami began showering packets of vibhuti into her lap until it was filled with sacred ash.",
      "Swami then told Maa to come with Him to see something even more wondrous. He led her into an adjoining room and opened the door. What Maa saw within defied earthly reality: the entire room was filled with snakes of different luminous colours, each bearing a radiant Diamond Mani atop its head! Suddenly, one of the serpents leapt towards Bhagwan Baba and coiled around Swami's neck. Seeing Maa frightened, Swami smiled: \"You need not worry; I will show you their original swaroop.\"",
      "To Maa's utter surprise and wonder, every single snake instantaneously converted itself into its true swaroop — all the sacred Nag-Devtas! Maa was filled with uncontainable joy and reverent awe. She bowed her head before all the Nag-Devtas, honouring them for granting their saakshaat darshan and conveying her deepest gratitude. The Nag-Devtas blessed Maa and then manifested back into different-coloured serpents.",
      "After granting these extraordinary darshans, Swami asked with a smile: \"What more do you want to see?\" Maa replied from the depths of her soul: \"Nothing, Swami — only You.\" Swami smiled benevolently, showered His eternal blessings, and disappeared."
    ],
    relicNote: "One of the most elevated mystical visions recorded in contemporary spiritual history.",
  },
  {
    id: "multiple-forms",
    categoryKey: "forms",
    categoryLabel: "(4) The One Appears as Many",
    title: "The Lord Appears in Multiple Forms",
    subtitle: "How Baba Manifested Himself in Multiple Forms at One Time in Front of Maa",
    date: "Wednesday Satsangs",
    location: "Maa's Residence & Bhajan Hall",
    image: "/assets/content/universe/sai_baba4_b.webp",
    aspect: "aspect-4/3",
    keyQuote: "You always cry that Swami Pada Namaskar Nahi Deta — today have My Pada Namaskar as much as you want!",
    excerpt: "While Maa was cleaning the bhajan space on Tuesday, Swami appeared asking 'Got tired?', granted unlimited Pada Namaskar, and attended the inaugural Wednesday satsang with all the Devi-Devatas of the Universe.",
    paragraphs: [
      "Swami's leelas are unpredictable. In whatever form one prays to Him, He manifests, being the formless Supreme Reality. Maa always used to pray: \"Swami, please allow me to hold your bhajans at my home on any day You choose.\" Swami graciously granted Wednesday as the blessed day for weekly bhajans.",
      "It was a Tuesday afternoon in October. Maa was cleaning the area where the first bhajan was to be held the following day. When physical fatigue overtook her, she rested her back against the wall. Suddenly, she heard a sweet voice: \"Got tired?\" Looking upward to her utter surprise, Brahmand Nayak Bhagwan Shri Sai Baba was standing before her! Swami smiled: \"You always cry all day long that Swami Pada Namaskar Nahi Deta. Today, have My Pada Namaskar as much as you want!\"",
      "Maa immediately bowed at Swami's lotus feet, washing them with tears of devotion. After some time, Swami gently placed His hands on her shoulders and helped her stand. Maa asked: \"Swami, You told me to take as much Pada Namaskar as I wanted, why are You lifting me up?\" Swami replied tenderly: \"I also get tired!\" Loving His beloved Maa like a caring father loves his daughter, Swami affirmed: \"Never cry in your life; Swami is always close to you. You do not know that you have been My daughter for many lifetimes.\"",
      "As Swami prepared to leave, Maa held Swami's robe: \"Swami, tomorrow is the very first bhajan in my home. Will You come?\" Swami was quiet for a moment, then agreed: \"I will come with all the Devi-Devatas of this Universe! But Swami has one condition: you will not look back to see from where Swami arrives or departs.\" Maa was ecstatic.",
      "Near Maa's residence lived Mr. B.D. Gupta, a devoted Sai follower who usually resided near Baba in Puttaparthi. Swami appeared in a vision to Mr. Gupta, saying: \"Tomorrow is My bhajan at Maa's home; you must go there.\" Maa had not invited him assuming he was away in Puttaparthi. When he arrived, he announced: \"You didn't invite me, but Swami personally sent me here!\" During the evening aarti, as Mr. Gupta stepped forward to conduct aarti, a powerful electric surge threw him back. Swami's voice firmly cautioned him to maintain sacred distance. In that instant, Maa and the devotees beheld Bhagwan sitting in transcendent splendor accompanied by the divine host of Devi-Devatas!"
    ],
    relicNote: "Instituted Wednesday as the sacred weekly bhajan tradition at the sanctum.",
  },
  {
    id: "laxmi-ganesh-miracle",
    categoryKey: "materialisation",
    categoryLabel: "(5) Materialisation",
    title: "The Sacred Laxmi-Ganesh Miracle",
    subtitle: "How Baba Gifted Maa with Gold Laxmi-Ganesh in Deep Dhyana at Age 17",
    date: "At the Tender Age of 17",
    location: "Early Sadhana Sanctum, Agra",
    image: "/assets/content/miracles/laxmi-ganesh-miracle-photo.webp",
    aspect: "aspect-4/3",
    keyQuote: "You come two stairs up, and I will come all the stairs down for you.",
    excerpt: "At age 17 during early morning dhyan, a diamond-studded silver door opened. When Maa hesitated to climb the stairs, Swami promised to descend all the stairs if she climbed two, materialising a silver casket of Sindhoor and gold Laxmi-Ganesh idols.",
    paragraphs: [
      "The leelas of Swami are far beyond human expectation. This sacred manifestation occurred when Maa was at the tender age of seventeen. As was her daily spiritual discipline, Maa was sitting in deep meditation early in the morning.",
      "To her utter astonishment, the physical walls dissolved, and an immense silver door embedded with sparkling diamonds slowly swung open before her. From within that radiant celestial gateway, Bhagwan Sri Sathya Sai Baba descended in glorious grace.",
      "A long flight of stairs separated Maa from that celestial door. Swami smiled warmly and said: \"Come upstairs.\" Like a child speaking to her loving father, Maa replied innocently: \"I am not coming up.\" Swami gave a tender smile and said: \"You come two stairs up, and I will come all the stairs down for you.\"",
      "As soon as Maa climbed two stairs, Swami instantaneously descended all the remaining stairs to stand directly before her. Swami waved His hand in the air and materialised a small box of pure silver metal filled to the brim with sacred Sindhoor. Waving His hand once more, Swami materialised golden idols of Lord Laxmi and Lord Ganesh, placing them lovingly into Maa's hands.",
      "When Maa asked what this divine gift was, Swami bestowed a radiant smile, showered His divine blessings upon her, and gently disappeared. Ever since, Maa has preserved that silver casket and the consecrated gold Laxmi-Ganesh as an everlasting fountain of Bhagwan's protective grace.",
    ],
    relicNote: "Preserved with reverence as the eternal spiritual treasure gifted during early sadhana.",
  },
  {
    id: "sea-shell-wonder",
    categoryKey: "materialisation",
    categoryLabel: "(5) Materialisation",
    title: "The Sacred Sea Shell Wonder",
    subtitle: "How Baba Materialised Holy Sea Shells and Gifted Them to Beloved Maa",
    date: "Bhajan Hall",
    location: "Satyadeep Sai Universe Prayer Room",
    image: "/assets/content/miracles/astonishing-miracle-2-photo.webp",
    aspect: "aspect-4/3",
    keyQuote: "Form the sacred OM shape with these sea shells and install them in the Bhajan Room.",
    excerpt: "Upon sounding the sacred conch during aarti as instructed by Swami, a wondrous downpour of sea shells fell from empty air, which Swami directed to be fashioned into a radiant OM emblem, followed by manifestations of three-eyed lingams and holy amrit.",
    paragraphs: [
      "Swami's leelas and cosmic manifestations are beyond all human expectation. One such extraordinary materialisation occurred during the divine ceremonies of the sanctum.",
      "Swami instructed Maa to bring a sacred conch (Shankh) and flute it during the solemn offering of aarti. When Maa blew the conch with deep devotion, a stunning miracle occurred before the eyes of all gathered: a heavy shower of pristine sea shells rained down from empty space throughout the hall!",
      "Following this shower, Swami instructed Maa: \"Make the holy shape of OM with these sea shells and install them in the Bhajan Room.\" Maa lovingly arranged the materialised sea shells into a luminous sacred OM emblem, which was installed permanently in the sanctum.",
      "Subsequently, Swami gifted numerous black and white Shiva lingams, sacred rudrakshas, and holy coconuts (nariyals) to Maa. Among all these divine gifts, Bhagwan granted one extraordinary lingam in which three distinct divine eyes are permanently embedded within its sacred stone.",
      "Over the years, divine honey and sweet amrit have repeatedly oozed from Swami's photos, and Swami has continually granted His physical presence through showers of sacred vibhuti — bearing testimony to the unbroken communion between Swami and His beloved Maa."
    ],
    relicNote: "The sacred sea shell OM and the tripartite three-eyed Shiva Lingam are installed in the sanctum.",
  },
];

export default function MaaClientPortal({ mediaMap }: { mediaMap: Record<string, string> }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const resolvedInitialTab: TabKey = useMemo(() => {
    if (tabParam === "miracles") return "miracles";
    if (tabParam === "life-sketch" || tabParam === "sketch") return "life-sketch";
    if (tabParam === "teachings" || tabParam === "teaching") return "teachings";
    if (tabParam === "meditation" || tabParam === "dhyana") return "meditation";
    if (tabParam === "discourses" || tabParam === "discourse") return "discourses";
    return "glorious-life";
  }, [tabParam]);

  const [activeTab, setActiveTab] = useState<TabKey>(resolvedInitialTab);
  const [selectedMiracleCategory, setSelectedMiracleCategory] = useState<string>("all");
  const [expandedMiracleId, setExpandedMiracleId] = useState<string | null>(null);
  const [readingModalMiracle, setReadingModalMiracle] = useState<(typeof MIRACLES_LIST)[number] | null>(null);

  const filteredMiracles = useMemo(() => {
    if (selectedMiracleCategory === "all") return MIRACLES_LIST;
    return MIRACLES_LIST.filter((m) => m.categoryKey === selectedMiracleCategory);
  }, [selectedMiracleCategory]);

  useEffect(() => {
    if (tabParam === "miracles") setActiveTab("miracles");
    else if (tabParam === "life-sketch" || tabParam === "sketch") setActiveTab("life-sketch");
    else if (tabParam === "teachings" || tabParam === "teaching") setActiveTab("teachings");
    else if (tabParam === "meditation" || tabParam === "dhyana") setActiveTab("meditation");
    else if (tabParam === "discourses" || tabParam === "discourse") setActiveTab("discourses");
  }, [tabParam]);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Sleek, Compact Header & Tab Bar */}
      <div className="space-y-4 pb-2 border-b border-maroon-100/70">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-maroon-950 tracking-tight">
                Beloved Maa
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-saffron-50 px-2.5 py-0.5 text-[11px] font-bold text-saffron-800 border border-saffron-200">
                <Sparkles className="h-3 w-3 text-saffron-600" />
                Spiritual Preceptor
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Guiding light of unconditional love, Nishkama Seva &amp; communion with Bhagwan Sri Sathya Sai Baba.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 shrink-0">
            <Flame className="h-3.5 w-3.5 text-gold-500" />
            <span>Satyadeep Sai Universe · Meerut</span>
          </div>
        </div>

        {/* Compact Segmented Tab Navigation Bar (Wraps cleanly on mobile, no horizontal scrolling) */}
        <div className="p-1 sm:p-1.5 rounded-2xl bg-amber-50/70 border border-maroon-100/70 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
            {TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-maroon-900 text-white shadow-sm ring-1 ring-gold-400/50"
                      : "bg-white/80 text-stone-700 hover:text-maroon-950 hover:bg-white border border-maroon-100/40 shadow-2xs"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isSelected ? "text-gold-300" : "text-saffron-700"
                    }`}
                  />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab 1: Glorious Life Journey */}
      {activeTab === "glorious-life" && (
        <div className="space-y-12">
          {/* Top Story Block */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                Spiritual Descent &amp; Early Sadhana
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-900 leading-snug">
                An Enlightened Soul Awaking the Divine Jyoti in Thousands
              </h2>
              <p className="text-[16px] leading-relaxed text-stone-600">
                There are certain spiritually blessed souls who take birth on this earth to enlighten the path
                of ultimate spiritual evolution. <strong>Maa</strong> is one such divine soul who, through her
                unflinching love and selfless sadhana, has awakened the divine jyoti (flame) in thousands of
                Sai devotees across the globe.
              </p>
              <p className="text-[15px] leading-relaxed text-stone-600">
                Born in January 1962 in Agra, her childhood was suffused with the wisdom of Lord Shiva and
                Lord Krishna. Her grandmother, Smt. Kaushalya Devi, would take young Maa barefoot at 4:00 AM
                across four kilometres to the holy <strong>Manakameshwar Temple</strong> in Ravat-Para, Agra,
                carrying milk for daily abhishek.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center py-4">
              <FloatingShowcase
                src="/assets/content/maa/1.webp"
                alt="Beloved Maa — Satyadeep Sai Universe"
                aspectClassName="aspect-[3/4]"
                className="w-full max-w-[360px]"
                imageClassName="object-contain bg-cream-50"
              />
            </div>
          </div>

          {/* Darshan of Lord Shiva & Sai Baba */}
          <div className="grid gap-6 md:grid-cols-2">
            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-800">
                <Flame className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-900">
                Lord Shiva&apos;s Darshan at Age 5
              </h3>
              <p className="text-sm leading-relaxed text-stone-600">
                At the tender age of five, while performing abhishek at Manakameshwar Mandir, she had a
                sakshaat darshan of <strong>Lord Shiva in Ardhnarishwar swaroop</strong>. Lord Shiva smiled
                benevolently and instructed her: <em>&ldquo;My daughter, bring 100 kilos of milk on Mahashivratri for my abhishek.&rdquo;</em>
              </p>
              <p className="text-sm leading-relaxed text-stone-600">
                On Mahashivratri, when the temple doors opened, she was miraculously guided to the very front.
                As she offered sringar onto the holy Shivling, Lord Shiva opened His third eye three times and
                kept it half-open — commencing her lifetime of mystic communion.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gulal-100 text-maroon-800">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-900">
                Sai Baba&apos;s Sakshaat Darshan at Age 17
              </h3>
              <p className="text-sm leading-relaxed text-stone-600">
                After continuous dream darshans and sheer penance, Bhagwan Sri Sathya Sai Baba gave her
                direct physical darshan between 4:00 AM and 5:00 AM. A silver door embedded with diamonds
                opened, with stairs leading up to Swami.
              </p>
              <p className="text-sm leading-relaxed text-stone-600">
                Swami smiled and said: <em>&ldquo;You come two steps up, and I will come down for you.&rdquo;</em> As she
                stepped forward, Swami came down the stairs, embraced her with infinite fatherly love, and
                declared: <em>&ldquo;You are my daughter for the past few janams.&rdquo;</em>
              </p>
            </SpotlightCard>
          </div>

          {/* Abhishek Tradition Showcase */}
          <div className="rounded-3xl border border-gold-300/80 bg-linear-to-br from-amber-50/80 via-white to-saffron-50/50 p-6 sm:p-8 shadow-xs">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-block rounded-full bg-saffron-100 px-3 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
                  Living Spiritual Heritage
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-maroon-950">
                  The Continuous Abhishek Tradition at Satyadeep Shiv Sai Universe
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Even today, the sacred abhishek tradition begun in Maa&apos;s childhood continues at
                  Satyadeep Sai Universe and Satyadeep Shiv Sai Universe in Meerut. Devotees join in
                  reverent worship, meditating in an environment charged with divine purity.
                </p>
              </div>
              <div className="lg:col-span-4 overflow-hidden rounded-2xl border-2 border-gold-200 shadow-sm">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/maa-life-sketch/abhishek.webp")}
                  alt="Maa performing abhishek"
                  width={500}
                  height={350}
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Maa Life Sketch & Human Values */}
      {activeTab === "life-sketch" && (
        <div className="space-y-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider">
                <Heart className="h-4 w-4" />
                The Master Mother
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-900 leading-snug">
                &ldquo;Service to Mankind is Service to God&rdquo; — Love All, Serve All
              </h2>
              <p className="text-[16px] leading-relaxed text-stone-600">
                <strong>Maa</strong> means an enlightened divine mother, a guiding light of unconditional
                compassion. Her unsullied love, guided meditation techniques, and unwavering faith in Sai Baba
                lead seekers naturally to higher states of human consciousness.
              </p>
              <p className="text-[15px] leading-relaxed text-stone-600">
                She teaches humanity through four foundational yogas: <strong>Bhakti Yoga</strong> (unflinching
                love of God), <strong>Karma Yoga</strong> (desireless selfless action), <strong>Jnana Yoga</strong>{" "}
                (supreme knowledge of the true Self), and <strong>Dhyana Yoga</strong> (meditation).
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center py-4">
              <FloatingShowcase
                src="/assets/content/maa/3.webp"
                alt="Beloved Maa — Embodiment of Love, Humility and Wisdom"
                aspectClassName="aspect-[3/4]"
                className="w-full max-w-[360px]"
                imageClassName="object-contain bg-cream-50"
              />
            </div>
          </div>

          {/* The Five Human Values */}
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <span className="inline-block rounded-full bg-saffron-100 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
                Core Philosophy
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-maroon-900">
                The Five-Fold Path of Human Values
              </h3>
              <p className="mt-1 text-sm text-stone-600 max-w-2xl">
                Guided by Bhagwan Sri Sathya Sai Baba, Maa imparts the essential code for a wholesome,
                meaningful, and peaceful human life:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  value: "Sathya",
                  meaning: "Truth",
                  desc: "Speaking truth politely; truth is the inner spark of the divine in all.",
                  color: "border-amber-200 bg-amber-50/70",
                },
                {
                  value: "Dharma",
                  meaning: "Righteousness",
                  desc: "Right conduct, duty without egoism, acting well the part God assigned.",
                  color: "border-saffron-200 bg-saffron-50/70",
                },
                {
                  value: "Shanti",
                  meaning: "Peace",
                  desc: "Mental equanimity unaffected by worldly storms, surrendering fruits to God.",
                  color: "border-sky-200 bg-sky-50/70",
                },
                {
                  value: "Prema",
                  meaning: "Pure Love",
                  desc: "The unseen undercurrent connecting all beings; love is God, God is love.",
                  color: "border-rose-200 bg-rose-50/70",
                },
                {
                  value: "Ahimsa",
                  meaning: "Non-Violence",
                  desc: "Universal brotherhood, harming no creature in thought, word, or deed.",
                  color: "border-emerald-200 bg-emerald-50/70",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  className={`rounded-2xl border p-5 transition-all hover:-translate-y-1 shadow-xs ${item.color}`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    {item.meaning}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-maroon-900">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transforming Young Hearts & Mission Karuna */}
          <div className="grid gap-6 md:grid-cols-2">
            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
                <BookOpen className="h-5 w-5" />
              </span>
              <h4 className="font-display text-lg font-bold text-maroon-900">
                Transforming Children &amp; Balvikas
              </h4>
              <p className="text-sm leading-relaxed text-stone-600">
                Maa&apos;s greatest joy lies in instilling divine virtues in children and youth. Through
                regular Balvikas programmes, young minds are grounded in moral fortitude, respecting parents,
                and cultivating compassion towards all beings.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h4 className="font-display text-lg font-bold text-maroon-900">
                Mission Karuna &amp; Selfless Seva
              </h4>
              <p className="text-sm leading-relaxed text-stone-600">
                Motivated by Baba, Maa established Mission Karuna — sponsoring tuition, uniforms, books,
                and daily sustenance for underprivileged children, enabling them to stand on their own
                feet as honorable citizens.
              </p>
              <div className="pt-2">
                <Link
                  href="/mission-karuna"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-700 hover:text-maroon-900"
                >
                  <span>Read more about Mission Karuna</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Tab: Teachings of Maa */}
      {activeTab === "teachings" && (
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center sm:text-left space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              Universal Spiritual Wisdom &amp; Eternal Values
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon-900 leading-snug">
              Teachings of Maa: The Path of Love and Selfless Service
            </h2>
            <p className="text-stone-600 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed">
              Sri Sathya Sai Baba and beloved Maa teach that God is One, and that all world religions
              are diverse streams flowing toward the same cosmic ocean. The foundation of spiritual life
              rests upon two pillars: <strong>Love (Prema)</strong> and <strong>Selfless Service (Nishkama Seva)</strong>.
            </p>
          </div>

          {/* Golden Quote Hero Banner with Maa Photo */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold-300/70 bg-linear-to-br from-amber-50 via-orange-50/60 to-cream-100 p-7 sm:p-9 shadow-sm">
            <Quote className="absolute -bottom-4 -right-4 h-32 w-32 text-gold-200/50 pointer-events-none" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-saffron-700">
                  Core Divine Maxim
                </span>
                <p className="font-display text-xl sm:text-2xl font-bold text-maroon-950 leading-relaxed italic">
                  &ldquo;Start the day with Love; Spend the day with Love; Fill the day with Love; End the day with Love; This is the way to God.&rdquo;
                </p>
                <p className="text-sm font-semibold text-stone-600">
                  — Bhagwan Sri Sathya Sai Baba &amp; Beloved Maa
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative overflow-hidden rounded-2xl border-2 border-gold-400/80 shadow-md bg-white max-w-[260px] w-full">
                  <Image
                    src={resolveMediaUrl(mediaMap, "/assets/content/teachings/mg-9291.jpg")}
                    alt="Teachings of Beloved Maa"
                    width={400}
                    height={500}
                    className="aspect-3/4 w-full object-cover"
                  />
                  <div className="p-2 text-center text-xs font-bold text-maroon-900 bg-amber-50/90">
                    Beloved Maa · Teachings of Truth &amp; Love
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1. The Five Human Values */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Foundational Truth
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                The Five Human Values (Sanathana Dharma)
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Baba affirms: <em>&ldquo;Truth is my name, Righteousness is the way I walk, Peace is my very nature, and Love is the way of my life.&rdquo;</em>
                {" "}When Love manifests in human life, it takes five sacred expressions:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  value: "Sathya",
                  meaning: "Truth",
                  desc: "Love in speech. Speaking truth with gentleness, sincerity, and compassion.",
                  quote: "Truth is the eternal foundation of all creation.",
                  color: "border-amber-200 bg-amber-50/60 text-amber-900",
                  badge: "bg-amber-100 text-amber-800",
                },
                {
                  value: "Dharma",
                  meaning: "Right Conduct",
                  desc: "Love in action. Discharging daily duties selflessly with moral rectitude.",
                  quote: "Dharmo Rakshati Rakshitah — Dharma protects those who protect it.",
                  color: "border-orange-200 bg-orange-50/60 text-orange-900",
                  badge: "bg-orange-100 text-orange-800",
                },
                {
                  value: "Shanti",
                  meaning: "Peace",
                  desc: "Love in thought. Maintaining steady inner tranquility amidst worldly storms.",
                  quote: "True peace resides within your own purified heart.",
                  color: "border-emerald-200 bg-emerald-50/60 text-emerald-900",
                  badge: "bg-emerald-100 text-emerald-800",
                },
                {
                  value: "Prema",
                  meaning: "Divine Love",
                  desc: "Love as the supreme essence of God. Pure, unconditional, and universal.",
                  quote: "Love is God. God is Love. Live in Love.",
                  color: "border-rose-200 bg-rose-50/60 text-rose-900",
                  badge: "bg-rose-100 text-rose-800",
                },
                {
                  value: "Ahimsa",
                  meaning: "Non-Violence",
                  desc: "Love in understanding. Never causing pain to any living being in thought, word, or deed.",
                  quote: "Ahimsa Paramo Dharma — Non-injury is the highest righteousness.",
                  color: "border-sky-200 bg-sky-50/60 text-sky-900",
                  badge: "bg-sky-100 text-sky-800",
                },
                {
                  value: "Sarva Dharma",
                  meaning: "Unity of Faiths",
                  desc: "There is only one caste, the caste of Humanity; only one religion, the religion of Love; only one language, the language of the Heart.",
                  quote: "All paths lead to the same Divine Ocean.",
                  color: "border-purple-200 bg-purple-50/60 text-purple-900",
                  badge: "bg-purple-100 text-purple-800",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  className={`rounded-2xl border p-5 transition-all hover:shadow-md ${item.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold">{item.value}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.badge}`}>
                      {item.meaning}
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                    {item.desc}
                  </p>
                  <p className="mt-3 border-t border-stone-200/60 pt-2 text-[11.5px] font-medium italic text-stone-600">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Prema — The Highest Sadhana & Sacred Parables */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Profound Parables
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                Prema: The Highest Sadhana
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Maa regularly shares Bhagwan Baba’s profound parables that illustrate how divine love
                must be nurtured and how the same divine energy flows through every soul:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Parable 1: The Seedling & The Tree */}
              <SpotlightCard className="flex flex-col justify-between rounded-3xl border border-saffron-200 bg-white p-7 shadow-xs">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-saffron-100 px-3 py-1 text-xs font-bold text-saffron-800">
                    <Sparkles className="h-3.5 w-3.5" />
                    Parable of the Tender Seedling
                  </div>
                  <h4 className="font-display text-xl font-bold text-maroon-950">
                    Guarding the Tender Seedling of Divine Love
                  </h4>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    When a seed first sprouts, it is fragile and tender. If left exposed, grazing goats
                    and cattle may consume it before it can take root. The wise gardener erects a sturdy
                    fence around it, watering and tending it daily until its roots sink deep.
                  </p>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    Once the sapling matures into a magnificent, deep-rooted banyan tree, the protective
                    fence is no longer needed. The very same cattle that once threatened it now find
                    soothing shade and nourishment beneath its expansive branches.
                  </p>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                    &ldquo;In the beginning, your spiritual practice must be safeguarded with discipline,
                    holy company (satsang), and meditation. Once Love matures into universal oneness, it
                    gives shelter and peace to everyone around you.&rdquo;
                  </div>
                </div>
              </SpotlightCard>

              {/* Parable 2: The Electric Current & The Bulbs */}
              <SpotlightCard className="flex flex-col justify-between rounded-3xl border border-gold-200 bg-white p-7 shadow-xs">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                    <Sun className="h-3.5 w-3.5" />
                    Parable of the One Electric Current
                  </div>
                  <h4 className="font-display text-xl font-bold text-maroon-950">
                    One Divine Energy Expressed in Countless Vessels
                  </h4>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    Electric current flowing through the grid is invisible, uniform, and single.
                    When connected to a modest 10-watt bulb, it gives a soft, tender nightlight.
                    When connected to a 1,000-watt floodlight, it blazes with brilliant illumination across an entire hall.
                    When sent through a heater, it radiates warmth.
                  </p>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    The difference lies not in the current, but in the capacity and nature of the bulb.
                    Similarly, the same Supreme Atma (Divine Spirit) dwells in every heart.
                    As we purify our mind and thoughts, that same Divine Current radiates through us as
                    boundless Love, compassion, and divine radiance.
                  </p>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                    &ldquo;Bodies are different, minds are different, but the Divine Current animating
                    every single being is One and the same.&rdquo;
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* 3. Nishkama Seva (Selfless Service) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Worship Through Action
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                Nishkama Seva: Hands That Help Are Holier Than Lips That Pray
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Beloved Maa teaches that spiritual wisdom remains incomplete if it is not translated
                into compassionate action for the suffering and needy:
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-xs space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
                  <HandHeart className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">
                  Love All, Serve All
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  Recognizing God in every suffering human being. Seva performed without expecting reward
                  or fame dissolves the ego and connects the soul with the infinite.
                </p>
              </div>

              <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-xs space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">
                  Help Ever, Hurt Never
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  A sacred pledge for every devotee: to use our speech, hands, and resources only to
                  uplift, console, and heal, never uttering words that inflict sorrow.
                </p>
              </div>

              <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-xs space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-800">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">
                  Manava Seva Is Madhava Seva
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  Serving human beings in distress is the direct and highest worship of the Divine.
                  Narayan Seva (feeding the hungry) and Mission Karuna (child aid) embody this truth.
                </p>
              </div>
            </div>

            {/* Quick Links to Temple Seva Activities */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-saffron-200 bg-saffron-50/70 p-5 sm:p-6">
              <div className="space-y-1">
                <h5 className="font-display text-base sm:text-lg font-bold text-maroon-900">
                  Experience Nishkama Seva at Satyadeep Sai Universe
                </h5>
                <p className="text-xs sm:text-sm text-stone-600">
                  Participate in monthly Narayan Seva, child education aid, and mandir seva initiatives.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/mission-karuna"
                  className="rounded-full bg-saffron-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-saffron-700 transition-colors"
                >
                  Mission Karuna
                </Link>
                <Link
                  href="/trust"
                  className="rounded-full border border-maroon-300 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-maroon-800 hover:bg-cream-100 transition-colors"
                >
                  Support Trust
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Maa on Meditation */}
      {activeTab === "meditation" && (
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center sm:text-left space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              <Sun className="h-3.5 w-3.5" />
              Sacred Sadhana &amp; Inner Communion
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon-900 leading-snug">
              Maa on Meditation: The Art of Jyoti Dhyana
            </h2>
            <p className="text-stone-600 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed">
              Meditation is not mere concentration, but getting in tune with the inner source of Divine energy.
              Beloved Maa guides spiritual seekers along the sacred path of <strong>Jyoti (Flame) Meditation</strong> to
              awaken peace, purify the senses, and merge into cosmic consciousness.
            </p>
          </div>

          {/* Golden Quote Banner */}
          {/* Golden Quote Banner with Maa Photo */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold-300/70 bg-linear-to-br from-amber-50 via-orange-50/60 to-cream-100 p-7 sm:p-9 shadow-sm">
            <Quote className="absolute -bottom-4 -right-4 h-32 w-32 text-gold-200/50 pointer-events-none" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-saffron-700">
                  Essence of Meditation
                </span>
                <p className="font-display text-xl sm:text-2xl font-bold text-maroon-950 leading-relaxed italic">
                  &ldquo;Meditation is getting absorbed in God as the only thought, the only goal. God only, only God.
                  Think God, breathe God, love God.&rdquo;
                </p>
                <p className="text-sm font-semibold text-stone-600">
                  — Beloved Maa &amp; Bhagwan Sri Sathya Sai Baba
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative overflow-hidden rounded-2xl border-2 border-gold-400/80 shadow-md bg-white max-w-[260px] w-full">
                  <Image
                    src={resolveMediaUrl(mediaMap, "/assets/content/meditation/maa-meditation.jpg")}
                    alt="Maa on Meditation"
                    width={400}
                    height={500}
                    className="aspect-3/4 w-full object-cover"
                  />
                  <div className="p-2 text-center text-xs font-bold text-maroon-900 bg-amber-50/90">
                    Beloved Maa in Deep Meditation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rose Plant Analogy: Concentration, Contemplation, Meditation */}
          <div className="rounded-3xl border border-rose-200 bg-linear-to-br from-rose-50/70 via-white to-amber-50/60 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                The Rose Plant Analogy
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                Concentration, Contemplation and Meditation
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Beloved Maa illustrates the three stages of spiritual evolution through the analogy of the rose plant:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-rose-200 bg-white p-5 shadow-xs space-y-2.5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700 font-bold text-sm">
                  1
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">Concentration</h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  A rose plant has leaves, thorns, and flowers. Concentration is identifying where the thorns are
                  and where the flower is by carefully observing the plant with outward senses.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs space-y-2.5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-bold text-sm">
                  2
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">Contemplation</h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  To carefully cut the flower of love away from the worldly desires (thorns). This is contemplation —
                  detaching the mind from external temptations through discrimination.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs space-y-2.5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                  3
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">Meditation</h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  To offer that cut rose flower of pure divine love at the Lotus Feet of the Lord. In this offering,
                  the individual ego dissolves into the Divine Ocean.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Jyoti Dhyana Practice & Image */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Step-by-Step Guidance
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                The Sacred Jyoti (Flame) Meditation Technique
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                As advised by Bhagwan Baba and beloved Maa, <strong>&ldquo;Jyoti&rdquo; (Divine Flame)</strong> is the
                highest, most universal object of meditation because light has no form, no boundaries, and belongs
                equally to all religions and traditions.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    step: "1. Brahmamuhurtham Timing",
                    text: "Sit at the same sacred spot and the same time every day, preferably between 3:00 AM and 6:00 AM (Brahmamuhurtham), when cosmic stillness prevails.",
                  },
                  {
                    step: "2. Soham Breath Alignment",
                    text: "Sit with spine erect. Slowly breathe in mentally chanting 'So' (He/God), and breathe out mentally chanting 'Ham' (I/Am) — affirming 'I am Divine'.",
                  },
                  {
                    step: "3. Bringing the Light Within",
                    text: "Gaze at a lamp flame, close your eyes, and visualize that radiant flame descending into the lotus of your heart. Feel it dispelling all inner darkness.",
                  },
                  {
                    step: "4. Purifying the Senses",
                    text: "Guide the flame to your eyes (to see only the Divine), ears (to hear only sacred words), tongue (to speak kindly and obligingly), and hands (to serve).",
                  },
                  {
                    step: "5. Cosmic Expansion",
                    text: "Expand this flame outward to encompass family, friends, adversaries, all living beings, and the entire creation in boundless Golden Light.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-display text-sm font-bold text-maroon-950">{item.step}</h5>
                      <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative overflow-hidden rounded-3xl border-4 border-gold-300/70 shadow-xl bg-stone-900 p-2 max-w-sm w-full">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/archive/meditation.gif")}
                  alt="Jyoti Flame Meditation as taught by Maa"
                  width={400}
                  height={500}
                  unoptimized
                  className="w-full rounded-2xl object-cover"
                />
                <div className="p-3 bg-linear-to-r from-saffron-50 via-cream-50 to-amber-50 rounded-xl mt-2 text-center text-xs font-bold text-maroon-900">
                  Jyoti Dhyana · Light of Divine Consciousness
                </div>
              </div>
            </div>
          </div>

          {/* Threefold Benefits */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-xs space-y-2">
              <h4 className="font-display text-lg font-bold text-emerald-950">Benefits for Health</h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                Regulates blood pressure, calms the heartbeat, stabilizes breathing, and fills every cell with
                invigorating cosmic prana.
              </p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-6 shadow-xs space-y-2">
              <h4 className="font-display text-lg font-bold text-sky-950">Psychological Benefits</h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                Dissolves anxiety, purifies emotional turbulence, enhances concentration, and bestows unfailing
                peace of mind.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 shadow-xs space-y-2">
              <h4 className="font-display text-lg font-bold text-amber-950">Spiritual Benefits</h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                Breaks body attachment, removes the ego, awakens the indwelling Atma, and culminates in Divine
                Union (Atma Sakshatkar).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Divine Discourses */}
      {activeTab === "discourses" && (
        <div className="space-y-12">
          {/* Header with Maa Photo */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 text-center sm:text-left space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
                <Flame className="h-3.5 w-3.5" />
                Living Wisdom for Daily Life
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon-900 leading-snug">
                Divine Discourses of Maa: Sathya, Dharma &amp; Righteous Living
              </h2>
              <p className="text-stone-600 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed">
                In regular satsangs at Satyadeep Sai Universe, beloved Maa delivers uplifting discourses that guide
                devotees on how to live peacefully, speak truth obligingly, and perform everyday duties as a sacred
                play of the Lord.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative overflow-hidden rounded-2xl border-2 border-gold-400/80 shadow-md bg-white max-w-[260px] w-full">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/discourses/dsc-5801.jpg")}
                  alt="Divine Discourses of Maa"
                  width={400}
                  height={500}
                  className="aspect-3/4 w-full object-cover"
                />
                <div className="p-2 text-center text-xs font-bold text-maroon-900 bg-amber-50/90">
                  Beloved Maa · Divine Satsang Discourse
                </div>
              </div>
            </div>
          </div>

          {/* Discourse Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Discourse 1: Sathya (Truth) */}
            <SpotlightCard className="rounded-3xl border border-amber-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
                Discourse on Sathya (Truth)
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                &ldquo;If You Cannot Oblige, Speak Obligingly&rdquo;
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Man should emphasize speaking the truth and speaking it politely. Have unwavering faith that truth
                will protect and save you in the long run. Stick to it regardless of what worldly troubles may befall.
                Avoid hypocrisy and crookedness in speech.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                &ldquo;In everyone there is a spark of truth; life becomes dark without that spark. And that spark,
                that flame is God Himself, the eternal source of all truth and love.&rdquo;
              </div>
            </SpotlightCard>

            {/* Discourse 2: Dharma (The Role of the Actor) */}
            <SpotlightCard className="rounded-3xl border border-orange-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-900 uppercase tracking-wider">
                Discourse on Dharma (Right Conduct)
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                Actors in the Divine Cosmic Play
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Everyone should perform their work as actors perform in a drama — playing their allotted part with
                total dedication, yet keeping their true inner identity separate and not getting attached to the role.
                Always remember that everything assigned to you is the Lord&rsquo;s play.
              </p>
              <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-4 text-xs sm:text-sm text-orange-950 font-medium italic">
                &ldquo;We all are actors in the Divine Film and the Lord has assigned each of us a role. Act your
                part well; there all your duty ends. He is the Director, Designer, and Witness of the play.&rdquo;
              </div>
            </SpotlightCard>

            {/* Discourse 3: Inner Atmic Splendour */}
            <SpotlightCard className="rounded-3xl border border-gold-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
                Discourse on the Indwelling Atma
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                Turning Vision from Outer Universe to Inner Glory
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Man today has forgotten the Atmic bliss hidden inside — the sacred Force that regulates the senses,
                mind, and intellect. The Lord resides in everyone as the Atma. Bodies change and perish, but the
                Atma is birthless, deathless, and eternal.
              </p>
              <div className="rounded-xl border border-gold-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                &ldquo;Do not neglect the Lord within. Do not cling to the unreal and temporary. The Atma within you
                is the spring of joy, love, and everlasting peace.&rdquo;
              </div>
            </SpotlightCard>

            {/* Discourse 4: Nishkama Seva */}
            <SpotlightCard className="rounded-3xl border border-rose-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-900 uppercase tracking-wider">
                Discourse on Selfless Service
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                Worship the Living God in Everyone
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                &ldquo;Let us not just worship the statue of Sai Baba; let us worship the living God in everyone.&rdquo;
                Serving those in need, comforting the distressed, and feeding the hungry is the direct worship of Bhagwan.
                Hands that serve are truly holier than lips that pray.
              </p>
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-xs sm:text-sm text-rose-950 font-medium italic">
                &ldquo;Duty without love is deplorable. Duty with love is desirable. Love without duty is Divine.&rdquo;
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Tab 3: Miraculous Life of Maa */}
      {activeTab === "miracles" && (
        <div className="space-y-10 sm:space-y-12">
          {/* Integrated Sacred Intro Card */}
          <div className="relative overflow-hidden rounded-3xl border border-gold-300/80 bg-gradient-to-br from-amber-50/70 via-white to-cream-50/60 p-5 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
              {/* Photo of Beloved Maa */}
              <div className="relative shrink-0 overflow-hidden rounded-2xl border-2 border-gold-400/80 shadow-md bg-stone-100 w-36 h-48 sm:w-44 sm:h-56 aspect-[3/4]">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/maa-life-sketch/dsc-0167.jpg")}
                  alt="Beloved Maa · Miraculous Grace & Darshan"
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 p-1.5 text-center text-[10.5px] font-bold text-maroon-900 bg-amber-50/95 border-t border-gold-200">
                  Beloved Maa · Darshan
                </div>
              </div>

              {/* Title & Introduction */}
              <div className="flex-1 text-center sm:text-left space-y-2.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3 py-0.5 text-xs font-bold text-saffron-900 uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-saffron-600" />
                    Documented Divine Leelas
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    8 Authentic Historical Manifestations
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-maroon-950 leading-tight">
                  Miraculous Life of Beloved Maa
                </h2>
                <p className="text-xs sm:text-[14px] text-stone-600 leading-relaxed max-w-2xl">
                  Explore the authentic accounts of divine communion between Bhagwan Sri Sathya Sai Baba and beloved Maa —
                  featuring direct manifestations, celestial visions, sacred relics, and protective blessings.
                </p>
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/80 border border-gold-200/80 px-3.5 py-1.5 text-xs text-amber-950 font-medium italic shadow-2xs">
                  <Quote className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                  <span>&ldquo;God always listens to those who call on Him sincerely and in faith.&rdquo;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Segmented Category Filter Bar (No truncation, wraps cleanly on mobile) */}
          <div className="p-1.5 rounded-2xl bg-amber-50/70 border border-maroon-100/80 shadow-2xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {MIRACLE_CATEGORIES.map((cat) => {
                const isCatActive = selectedMiracleCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? MIRACLES_LIST.length
                    : MIRACLES_LIST.filter((m) => m.categoryKey === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedMiracleCategory(cat.id)}
                    className={`flex items-center justify-between sm:justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      isCatActive
                        ? "bg-maroon-900 text-white shadow-sm ring-1 ring-gold-400/50"
                        : "bg-white/85 text-stone-700 hover:text-maroon-950 hover:bg-white border border-maroon-100/50 shadow-2xs"
                    }`}
                  >
                    <span className="text-center sm:hidden">{cat.shortLabel || cat.label}</span>
                    <span className="text-center hidden sm:inline">{cat.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isCatActive
                          ? "bg-gold-400/25 text-amber-200"
                          : "bg-amber-100/80 text-amber-900"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Miracles */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {filteredMiracles.map((item) => {
              const isExpanded = expandedMiracleId === item.id;
              return (
                <SpotlightCard
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-maroon-100/90 bg-white shadow-xs transition-all hover:border-gold-400/80 hover:shadow-lg"
                >
                  {/* Card Media Header */}
                  <div className={`relative ${item.aspect} w-full overflow-hidden bg-cream-50/70 border-b border-maroon-100/60`}>
                    <Image
                      src={resolveMediaUrl(mediaMap, item.image)}
                      alt={item.title}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-maroon-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-amber-200">
                      {item.categoryLabel}
                    </div>
                    <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                      {item.date}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-saffron-700">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-maroon-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Swami's Words Box */}
                    <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 relative space-y-1">
                      <Quote className="h-4 w-4 text-amber-600/60 absolute top-3 right-3" />
                      <span className="text-[10.5px] uppercase font-bold text-amber-900 tracking-wider">
                        Sacred Divine Utterance
                      </span>
                      <p className="text-xs sm:text-[13.5px] font-medium italic text-maroon-950 leading-relaxed">
                        &ldquo;{item.keyQuote}&rdquo;
                      </p>
                    </div>

                    {/* Narrative Paragraphs */}
                    <div className="space-y-3 text-[14px] leading-relaxed text-stone-600 flex-1">
                      {isExpanded ? (
                        <>
                          {item.paragraphs.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                          {item.relicNote && (
                            <div className="rounded-xl border border-gold-200 bg-cream-50 p-3 text-xs text-maroon-950 font-medium">
                              <strong>Enshrined Today: </strong> {item.relicNote}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <p>{item.paragraphs[0]}</p>
                          {item.paragraphs[1] && (
                            <p className="hidden sm:block text-stone-500 line-clamp-3">
                              {item.paragraphs[1]}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-maroon-100/70 pt-4">
                      <button
                        type="button"
                        onClick={() => setExpandedMiracleId(isExpanded ? null : item.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-saffron-700 hover:text-saffron-900 transition-colors"
                      >
                        <span>{isExpanded ? "Collapse Account" : "Read Complete Text"}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setReadingModalMiracle(item)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-maroon-200 bg-maroon-50/70 px-3.5 py-1.5 text-xs font-bold text-maroon-800 hover:bg-maroon-100 transition-colors"
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span>Reading View</span>
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Reading Modal Dialog */}
          {readingModalMiracle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-gold-300 bg-white p-6 sm:p-8 shadow-2xl space-y-6">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setReadingModalMiracle(null)}
                  className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-stone-600 hover:bg-cream-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Header Information */}
                <div className="space-y-2 pr-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300 bg-saffron-50 px-3 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
                    {readingModalMiracle.categoryLabel}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-maroon-900 leading-snug">
                    {readingModalMiracle.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-saffron-800 uppercase tracking-wider">
                    {readingModalMiracle.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-saffron-600" />
                      {readingModalMiracle.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-saffron-600" />
                      {readingModalMiracle.location}
                    </span>
                  </div>
                </div>

                {/* Media Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-cream-50 border border-maroon-100">
                  <Image
                    src={resolveMediaUrl(mediaMap, readingModalMiracle.image)}
                    alt={readingModalMiracle.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>

                {/* Swami Quote */}
                <div className="rounded-2xl border-2 border-gold-300/80 bg-amber-50/90 p-5 relative space-y-1.5">
                  <Quote className="h-5 w-5 text-amber-600/70 absolute top-4 right-4" />
                  <p className="text-[11px] uppercase font-extrabold text-amber-800 tracking-wider">
                    Swami&apos;s Divine Words
                  </p>
                  <p className="text-base sm:text-lg font-medium italic text-maroon-950 leading-relaxed">
                    &ldquo;{readingModalMiracle.keyQuote}&rdquo;
                  </p>
                </div>

                {/* Full Narrative Text */}
                <div className="space-y-4 text-stone-700 leading-relaxed text-[15px] sm:text-[16px]">
                  {readingModalMiracle.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "first-letter:font-display first-letter:text-4xl first-letter:font-bold first-letter:text-saffron-800 first-letter:float-left first-letter:mr-2"
                          : ""
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Relic Note */}
                {readingModalMiracle.relicNote && (
                  <div className="rounded-2xl border border-saffron-200 bg-saffron-50/80 p-4 text-xs sm:text-sm text-saffron-950 font-medium">
                    <strong>Sacred Enshrinement: </strong> {readingModalMiracle.relicNote}
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex items-center justify-between border-t border-maroon-100 pt-4">
                  <span className="font-display text-sm font-bold text-gold-600">ॐ श्री साईं राम</span>
                  <button
                    type="button"
                    onClick={() => setReadingModalMiracle(null)}
                    className="rounded-full bg-maroon-800 px-5 py-2 text-xs font-bold text-white hover:bg-maroon-900 transition-colors"
                  >
                    Close Story
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-maroon-100 bg-cream-50/80 p-6 sm:p-8 text-center space-y-3">
            <p className="font-display text-xl font-bold text-maroon-900">
              &ldquo;God always listens to those who call on Him sincerely and in faith.&rdquo;
            </p>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
              — Beloved Maa
            </p>
          </div>
        </div>
      )}

      {/* Bottom Devotional Footer */}
      <div className="border-t border-maroon-100/80 pt-8 text-center space-y-2">
        <p className="font-display text-2xl text-gold-500">ॐ साई राम</p>
        <p className="text-xs text-stone-500 font-medium">
          Satyadeep Sai Universe · Roorkee Road, Meerut Cantt, UP
        </p>
      </div>
    </div>
  );
}
