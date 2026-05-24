import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { createSparkleBurst } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

interface FriendshipGiftsProps {
  onContinue: () => void;
}

interface StoryPage {
  title: string;
  message: string;
  iconType:
    | 'kitkat'
    | 'ring'
    | 'necklace'
    | 'clothes'
    | 'letter'
    | 'earrings'
    | 'watch'
    | 'makeup'
    | 'teddy'
    | 'coffee'
    | 'crown'
    | 'perfume'
    | 'moonlamp'
    | 'handbag'
    | 'rose'
    | 'frame'
    | 'headphones'
    | 'sweater'
    | 'lollipop'
    | 'hoodie'
    | 'bracelet'
    | 'skincare'
    | 'tumbler'
    | 'bouquet'
    | 'hairbow'
    | 'wish';
}

const STORY_PAGES: StoryPage[] = [
  {
    title: 'KitKat Chocolate 🍫',
    message: 'Just like a KitKat, our friendship is the perfect blend of sweetness and crunch. You are always there to sweeten my days and make every tough moment feel light and comforting.',
    iconType: 'kitkat',
  },
  {
    title: 'Sparkling Ring 💍',
    message: 'This sparkling ring represents the unbreakable promise of our friendship. You are my absolute go-to person, and my loyalty to this beautiful bond we share is forever.',
    iconType: 'ring',
  },
  {
    title: 'Heart Necklace 📿',
    message: 'This necklace is a symbol of how close you are to my heart. No matter the distance, you carry a special piece of my life, and I am so grateful to have you by my side.',
    iconType: 'necklace',
  },
  {
    title: 'Pretty Clothes 👗',
    message: 'You look absolutely stunning in everything you wear. This gorgeous dress represents your vibrant grace, elegance, and the beautiful light you bring to the world.',
    iconType: 'clothes',
  },
  {
    title: 'Handwritten Letter ✉️',
    message: 'A handwritten letter of true gratitude. You define kindness for me. Your selfless heart and open mind are a constant reminder of how beautiful human connection can be.',
    iconType: 'letter',
  },
  {
    title: 'Pearl Earrings 💎',
    message: 'These earrings represent how your voice and contagious laugh are music to my ears. You bring rhythm and joy into my life, making every simple moment spark.',
    iconType: 'earrings',
  },
  {
    title: 'Elegant Watch ⌚',
    message: 'Every single second spent talking to you is precious. Time flies by like magic during our conversations, and this watch represents every cherished minute of our friendship.',
    iconType: 'watch',
  },
  {
    title: 'Makeup Palette & Lipstick 💄',
    message: 'You are stunningly gorgeous inside and out. This makeup set represents your creativity, confidence, and the colorful joy you bring into my ordinary days.',
    iconType: 'makeup',
  },
  {
    title: 'Cozy Teddy Bear 🧸',
    message: 'For the times when you need a warm, comforting hug. You are my safe space and my ultimate comfort person, and I hope this teddy reminds you that you are never alone.',
    iconType: 'teddy',
  },
  {
    title: 'Warm Coffee Mug ☕',
    message: 'Our friendship is like a warm cup of coffee on a cold morning—cozy, energizing, and absolutely essential. Thank you for always listening to my endless rants.',
    iconType: 'coffee',
  },
  {
    title: 'Golden Crown 👑',
    message: 'To my absolute favorite queen. You deserve to be treated with all the pampering, love, and respect in the world. Never forget your worth and power!',
    iconType: 'crown',
  },
  {
    title: 'Luxury Perfume 🌸',
    message: 'Just like a sweet fragrance, your presence lingers in my life, bringing beauty and warmth to all my days. This bottle of perfume is a reminder of the elegant and refreshing energy you carry.',
    iconType: 'perfume',
  },
  {
    title: 'Dreamy Moon Lamp 🌙',
    message: 'A glowing guide for our late-night chats. You are my favorite night partner, shining a gentle, warm light when the rest of the world has gone to sleep.',
    iconType: 'moonlamp',
  },
  {
    title: 'Stylish Handbag 👜',
    message: 'For all your adventures and daily walks, I want you to carry this stylish handbag. It represents how you gracefully carry our memories and support wherever you go.',
    iconType: 'handbag',
  },
  {
    title: 'Blooming Red Rose 🌹',
    message: 'A flower representing your beautiful growth. You are blooming into an incredible person every single day, and I am so proud of the woman you are.',
    iconType: 'rose',
  },
  {
    title: 'Custom Photo Frame 🖼️',
    message: 'A frame to hold our most cherished memories and smiles. It is a real-world keepsake of the beautiful chapters we have written together and the many more to come.',
    iconType: 'frame',
  },
  {
    title: 'Wireless Headphones 🎧',
    message: 'For our shared songs, recommendations, and late-night voice calls. Our connection is like a perfect melody that never gets old.',
    iconType: 'headphones',
  },
  {
    title: 'Cozy Knitted Sweater 🧶',
    message: 'Bringing you warmth and comfort whenever life gets drafty or chaotic. You are my cozy harbor in every storm.',
    iconType: 'sweater',
  },
  {
    title: 'Sweet Cotton Candy 🍭',
    message: 'A reminder to keep holding onto your childish wonder, sweet laughter, and playfulness. Life is sweeter with your fun energy in it!',
    iconType: 'lollipop',
  },
  {
    title: 'Cozy Oversized Hoodie 🧥',
    message: 'On cold days or when you need a warm, comforting hug, wrap yourself in this cozy hoodie. I wish it reminds you of the warm safety and comfort of our friendship.',
    iconType: 'hoodie',
  },
  {
    title: 'Best Friends Bracelet 📿',
    message: 'A charm bracelet holding all our memories. Each charm represents an inside joke, a shared tear, or a loud laugh we\'ve experienced together.',
    iconType: 'bracelet',
  },
  {
    title: 'Premium Skincare Set 🧴',
    message: 'A little self-care package for you because you deserve all the pampering and love. Thank you for always taking care of everyone else—remember to take care of yourself too!',
    iconType: 'skincare',
  },
  {
    title: 'Cute Pastel Tumbler 🥤',
    message: 'A cute pastel tumbler to keep you hydrated and energized through your busy days. It represents my constant, quiet support, keeping your spirits warm or cool, wherever you are.',
    iconType: 'tumbler',
  },
  {
    title: 'Fresh Rose Bouquet 💐',
    message: 'A gorgeous bouquet of fresh roses to celebrate the beautiful person you are inside and out. You bring color, grace, and joy to my world, blooming more beautifully each year.',
    iconType: 'bouquet',
  },
  {
    title: 'Cute Hair Ribbon 🎀',
    message: 'Wrapping up all these 25 gifts with a neat bow. You are the most precious gift I have ever received in my life, and I cherish you more than words can say.',
    iconType: 'hairbow',
  },
  {
    title: 'My Wish For You 🌟',
    message: 'I am so sad that I am not able to come celebrate your birthday personally, cut the cake with you, and give you your gift in person. So, this is how I wanted you to celebrate... I wish you can feel my presence and my love through this journey. Happy 25th birthday, my forever bestie! 💖',
    iconType: 'wish',
  },
];

const FriendshipGifts = ({ onContinue }: FriendshipGiftsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      gsap.fromTo(containerRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      // Card initial float
      gsap.fromTo('.story-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = useCallback(() => {
    if (currentPage < STORY_PAGES.length - 1) {
      // Sparkle on page turn
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 4);
      }

      gsap.timeline()
        .to('.story-card', { x: -60, opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' })
        .call(() => {
          setCurrentPage(prev => prev + 1);
        })
        .fromTo('.story-card',
          { x: 60, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.4)' }
        );
    } else {
      onContinue();
    }
  }, [currentPage, onContinue]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0) {
      gsap.timeline()
        .to('.story-card', { x: 60, opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' })
        .call(() => {
          setCurrentPage(prev => prev - 1);
        })
        .fromTo('.story-card',
          { x: -60, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.4)' }
        );
    }
  }, [currentPage]);

  // Render SVG based on iconType
  const renderSVGIcon = (type: string) => {
    switch (type) {
      case 'kitkat':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* KitKat wrapper */}
            <rect x="8" y="12" width="28" height="22" rx="3" fill="#E63946" stroke="#9B1D20" strokeWidth="2" />
            {/* Silver foil underneath */}
            <path d="M12 12 H32 V15 L28 17 L24 15 L20 17 L16 15 L12 17 Z" fill="#E5E5E5" stroke="#B5B5B5" strokeWidth="1.5" />
            {/* Chocolate fingers sticking out */}
            <rect x="14" y="6" width="6" height="8" rx="1.5" fill="#4A3B32" stroke="#2F251E" strokeWidth="1.5" />
            <rect x="24" y="6" width="6" height="8" rx="1.5" fill="#4A3B32" stroke="#2F251E" strokeWidth="1.5" />
            {/* Detail lines on chocolate */}
            <line x1="17" y1="8" x2="17" y2="12" stroke="#2F251E" strokeWidth="1" />
            <line x1="27" y1="8" x2="27" y2="12" stroke="#2F251E" strokeWidth="1" />
            {/* Logo text/label mockup on KitKat */}
            <rect x="12" y="20" width="20" height="6" rx="1" fill="#FFF" opacity="0.9" />
            <path d="M15 23 H29" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'ring':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Ring Band */}
            <circle cx="22" cy="26" r="11" stroke="#FFD93D" strokeWidth="3" />
            <circle cx="22" cy="26" r="11" stroke="#FF9F1C" strokeWidth="1.5" />
            {/* Diamond setting */}
            <path d="M19 15 L22 18 L25 15 Z" fill="#FFD93D" />
            {/* Diamond */}
            <path d="M22 6 L28 11 L25 15 L19 15 L16 11 Z" fill="#E0F7FA" stroke="#00D4FF" strokeWidth="2" strokeLinejoin="round" />
            <path d="M22 6 L22 15" stroke="#00D4FF" strokeWidth="1" />
            <path d="M19 15 L22 11 L25 15" stroke="#00D4FF" strokeWidth="1" />
            {/* Sparkles */}
            <path d="M12 8 Q14 8 14 6 Q14 8 16 8 Q14 8 14 10 Q14 8 12 8 Z" fill="#00D4FF" />
            <path d="M28 8 Q30 8 30 6 Q30 8 32 8 Q30 8 30 10 Q30 8 28 8 Z" fill="#00D4FF" />
          </svg>
        );
      case 'necklace':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Chain */}
            <path d="M8 8 C8 24, 36 24, 36 8" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
            {/* Pendant connector */}
            <rect x="21" y="17" width="2" height="4" fill="#FFD93D" />
            {/* Heart Pendant */}
            <path d="M18 22 A 3 3 0 0 1 22 22 A 3 3 0 0 1 26 22 Q 26 26, 22 30 Q 18 26, 18 22 Z" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1.5" />
            {/* Jewel sparkle */}
            <circle cx="21" cy="23.5" r="1" fill="#FFF" />
          </svg>
        );
      case 'clothes':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Hanger */}
            <path d="M22 12 C22 9, 24 9, 24 11 C24 12, 22 13, 22 14" stroke="#D3D3D3" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M16 16 L22 14 L28 16" stroke="#D3D3D3" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Dress */}
            <path d="M17 16 L27 16 L29 20 L27 24 L31 38 L13 38 L17 24 L15 20 Z" fill="#FF758F" stroke="#C9184A" strokeWidth="2" strokeLinejoin="round" />
            {/* Dress Sash / Ribbon */}
            <path d="M16.5 24 H27.5" stroke="#FFF" strokeWidth="2.5" />
            <path d="M22 24 L20 30" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 24 L24 30" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Neckline pattern */}
            <circle cx="22" cy="18" r="1.5" fill="#FFF" />
          </svg>
        );
      case 'letter':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Paper sticking out */}
            <rect x="12" y="6" width="20" height="16" rx="1.5" fill="#FFF8F0" stroke="#D3C7F9" strokeWidth="1.5" />
            <line x1="16" y1="10" x2="28" y2="10" stroke="#D3C7F9" strokeWidth="1.5" />
            <line x1="16" y1="14" x2="26" y2="14" stroke="#D3C7F9" strokeWidth="1.5" />
            {/* Envelope body */}
            <path d="M6 18 H38 V36 H6 Z" fill="#FFE5EC" stroke="#FF758F" strokeWidth="2" />
            {/* Envelope fold lines */}
            <path d="M6 18 L22 28 L38 18" stroke="#FF758F" strokeWidth="2" fill="none" strokeLinejoin="round" />
            {/* Heart seal */}
            <path d="M20 28 A 1.5 1.5 0 0 1 22 28 A 1.5 1.5 0 0 1 24 28 Q 24 30.5, 22 32 Q 20 30.5, 20 28 Z" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1" />
          </svg>
        );
      case 'earrings':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Left Earring */}
            <line x1="15" y1="10" x2="15" y2="22" stroke="#FFD93D" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="15" cy="26" r="4.5" fill="#BF5FFF" stroke="#7C00FE" strokeWidth="2" />
            <circle cx="15" cy="26" r="1.5" fill="#FFF" />
            {/* Right Earring */}
            <line x1="29" y1="10" x2="29" y2="22" stroke="#FFD93D" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="29" cy="26" r="4.5" fill="#BF5FFF" stroke="#7C00FE" strokeWidth="2" />
            <circle cx="29" cy="26" r="1.5" fill="#FFF" />
            {/* Sparkles */}
            <path d="M9 22 Q10.5 22 10.5 20.5 Q10.5 22 12 22 Q10.5 22 10.5 23.5 Q10.5 22 9 22 Z" fill="#FFD93D" />
            <path d="M31 16 Q32.5 16 32.5 14.5 Q32.5 16 34 16 Q32.5 16 32.5 17.5 Q32.5 16 31 16 Z" fill="#FFD93D" />
          </svg>
        );
      case 'watch':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Strap */}
            <rect x="18" y="6" width="8" height="32" rx="2" fill="#EAD257" stroke="#C29D38" strokeWidth="1.5" />
            {/* Watch Dial outer */}
            <circle cx="22" cy="22" r="10" fill="#FFF8F0" stroke="#C29D38" strokeWidth="2.5" />
            {/* Watch face details */}
            <circle cx="22" cy="22" r="7" fill="#FFF" />
            {/* Hands */}
            <line x1="22" y1="22" x2="22" y2="17" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="22" y1="22" x2="26" y2="22" stroke="#1A1A2E" strokeWidth="1.2" strokeLinecap="round" />
            {/* Stem button */}
            <rect x="32" y="20" width="1.5" height="4" rx="0.5" fill="#C29D38" />
          </svg>
        );
      case 'makeup':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Lipstick Base */}
            <rect x="10" y="22" width="8" height="14" rx="1.5" fill="#1A1A2E" stroke="#05050F" strokeWidth="1.5" />
            <rect x="11.5" y="16" width="5" height="6" fill="#FFD93D" stroke="#C29D38" strokeWidth="1" />
            {/* Lipstick bullet */}
            <path d="M12 16 L12 10 Q14 6 16 10 L16 16 Z" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1.5" />
            {/* Makeup Palette / Compact */}
            <circle cx="29" cy="24" r="10" fill="#FFF8F0" stroke="#BF5FFF" strokeWidth="2" />
            {/* Mirror inner */}
            <circle cx="29" cy="24" r="7" fill="#E0F7FA" stroke="#00D4FF" strokeWidth="1.5" />
            {/* Brush */}
            <line x1="22" y1="36" x2="34" y2="28" stroke="#7F5539" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 28 L36 26.5" stroke="#FF758F" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'teddy':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Ears */}
            <circle cx="15" cy="14" r="4.5" fill="#DDB892" stroke="#7F5539" strokeWidth="1.5" />
            <circle cx="15" cy="14" r="2" fill="#FFE5EC" />
            <circle cx="29" cy="14" r="4.5" fill="#DDB892" stroke="#7F5539" strokeWidth="1.5" />
            <circle cx="29" cy="14" r="2" fill="#FFE5EC" />
            {/* Head */}
            <circle cx="22" cy="20" r="8.5" fill="#DDB892" stroke="#7F5539" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="19" cy="19.5" r="1" fill="#2E1C0C" />
            <circle cx="25" cy="19.5" r="1" fill="#2E1C0C" />
            {/* Snout */}
            <ellipse cx="22" cy="22.5" r="2.5" ry="1.8" fill="#FFF8F0" stroke="#7F5539" strokeWidth="1" />
            <polygon points="21.5,21.8 22.5,21.8 22,22.4" fill="#2E1C0C" />
            {/* Body */}
            <ellipse cx="22" cy="31.5" r="10.5" ry="8" fill="#DDB892" stroke="#7F5539" strokeWidth="1.5" />
            {/* Heart held in lap */}
            <path d="M20 29 A 1.8 1.8 0 0 1 22 29 A 1.8 1.8 0 0 1 24 29 Q 24 31.5, 22 33 Q 20 31.5, 20 29 Z" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1" />
          </svg>
        );
      case 'coffee':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Steam lines */}
            <path d="M16 10 Q18 8 16 6" stroke="#B5B5B5" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 9 Q24 7 22 5" stroke="#B5B5B5" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M28 10 Q30 8 28 6" stroke="#B5B5B5" strokeWidth="1.5" strokeLinecap="round" />
            {/* Mug Body */}
            <path d="M12 14 H32 V28 C32 32, 12 32, 12 28 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            {/* Latte Heart Foam */}
            <path d="M19 19 A 1.5 1.5 0 0 1 22 19 A 1.5 1.5 0 0 1 25 19 Q 25 21.5, 22 23 Q 19 21.5, 19 19 Z" fill="#FFF8F0" stroke="#7F5539" strokeWidth="1" />
            {/* Mug Handle */}
            <path d="M32 18 C36 18, 36 24, 32 24" stroke="#1D4ED8" strokeWidth="2" fill="none" />
            {/* Plate */}
            <ellipse cx="22" cy="34" rx="14" ry="2.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          </svg>
        );
      case 'crown':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            <path d="M8 32 L11 16 L17 24 L22 12 L27 24 L33 16 L36 32 Z" fill="#FFD93D" stroke="#C29D38" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Base Line */}
            <line x1="8" y1="32" x2="36" y2="32" stroke="#C29D38" strokeWidth="2.5" />
            {/* Jewels */}
            <circle cx="11" cy="16" r="1.5" fill="#FF4D6D" />
            <circle cx="22" cy="12" r="1.5" fill="#BF5FFF" />
            <circle cx="33" cy="16" r="1.5" fill="#00D4FF" />
            <circle cx="22" cy="27" r="2.5" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1" />
            <circle cx="15" cy="29" r="1.5" fill="#00D4FF" />
            <circle cx="29" cy="29" r="1.5" fill="#00D4FF" />
          </svg>
        );
      case 'perfume':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Perfume Bottle cap */}
            <rect x="19" y="8" width="6" height="5" rx="1" fill="#FFD93D" stroke="#C29D38" strokeWidth="1.5" />
            {/* Spray nozzle neck */}
            <rect x="21" y="13" width="2" height="3" fill="#D3D3D3" />
            {/* Bottle Body */}
            <rect x="12" y="16" width="20" height="20" rx="4" fill="#FFE5EC" stroke="#FF758F" strokeWidth="2.5" />
            {/* Perfume Liquid inside */}
            <rect x="14" y="22" width="16" height="12" rx="2" fill="#FFB3C1" opacity="0.7" />
            {/* Label on bottle */}
            <rect x="17" y="24" width="10" height="6" rx="1" fill="#FFF" stroke="#FF758F" strokeWidth="1" />
            <circle cx="22" cy="27" r="1.5" fill="#FF4D6D" />
            {/* Scent puff sparkles */}
            <path d="M12 10 Q10 8 12 6" stroke="#FF758F" strokeWidth="1" strokeLinecap="round" />
            <path d="M32 10 Q34 8 32 6" stroke="#FF758F" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );
      case 'moonlamp':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Stand */}
            <line x1="22" y1="28" x2="22" y2="38" stroke="#7F5539" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="32" x2="14" y2="38" stroke="#7F5539" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="32" x2="30" y2="38" stroke="#7F5539" strokeWidth="2" strokeLinecap="round" />
            {/* Glow aura */}
            <circle cx="22" cy="18" r="11" fill="#FFF176" opacity="0.2" />
            {/* Moon Orb */}
            <circle cx="22" cy="18" r="9" fill="#FFF176" stroke="#FFD93D" strokeWidth="2" />
            {/* Crescent inside */}
            <path d="M19 12 A 7.5 7.5 0 0 0 26 23 A 6.5 6.5 0 1 1 19 12 Z" fill="#FFF" opacity="0.6" />
            {/* Texture craters */}
            <circle cx="22" cy="15" r="1" fill="#EAD257" opacity="0.6" />
            <circle cx="24" cy="21" r="0.8" fill="#EAD257" opacity="0.6" />
          </svg>
        );
      case 'handbag':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Handbag Handle */}
            <path d="M14 16 C14 8, 30 8, 30 16" stroke="#7F5539" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Handbag Body */}
            <path d="M9 16 H35 L37 36 C37 38, 7 38, 7 36 Z" fill="#FF758F" stroke="#C9184A" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Flap */}
            <path d="M9 16 L22 26 L35 16" stroke="#C9184A" strokeWidth="2" fill="none" />
            {/* Clasp / Gold lock */}
            <circle cx="22" cy="25" r="2.5" fill="#FFD93D" stroke="#C29D38" strokeWidth="1.5" />
            {/* Stitching lines */}
            <path d="M9 32 H35" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </svg>
        );
      case 'rose':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Stem */}
            <path d="M22 22 V38" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M22 30 Q16 29 16 27 Q18 27 22 30 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1" />
            <path d="M22 34 Q28 33 28 31 Q26 31 22 34 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1" />
            {/* Rose Blossom layers */}
            <circle cx="22" cy="17" r="7" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1.5" />
            <path d="M17 14 C17 11 27 11 27 14 C27 18 17 18 17 14 Z" fill="#FF758F" stroke="#C9184A" strokeWidth="1" />
            <path d="M19 16 C19 14 25 14 25 16 C25 19 19 19 19 16 Z" fill="#C9184A" />
            <circle cx="22" cy="16" r="1.5" fill="#FFF" />
          </svg>
        );
      case 'frame':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Outer wooden frame */}
            <rect x="8" y="8" width="28" height="28" rx="2" fill="#7F5539" stroke="#5E3A21" strokeWidth="2.5" />
            {/* Inner mat board */}
            <rect x="11" y="11" width="22" height="22" fill="#FFF8F0" stroke="#7F5539" strokeWidth="1" />
            {/* Photo representation */}
            <rect x="14" y="14" width="16" height="16" fill="#E0F7FA" />
            {/* Two figures standing close */}
            <circle cx="19" cy="20" r="2.2" fill="#3B82F6" />
            <path d="M19 22.2 V27.5" stroke="#3B82F6" strokeWidth="1.5" />
            <circle cx="25" cy="21" r="2" fill="#FF4D6D" />
            <path d="M25 23 V27.5" stroke="#FF4D6D" strokeWidth="1.5" />
            {/* Sun/shine detail */}
            <circle cx="28" cy="16" r="1" fill="#FFD93D" />
          </svg>
        );
      case 'headphones':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Headband */}
            <path d="M10 24 C10 14 34 14 34 24" stroke="#BF5FFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Left Earpad */}
            <rect x="7" y="21" width="5" height="10" rx="2.5" fill="#FF758F" stroke="#C9184A" strokeWidth="1.5" />
            <rect x="12" y="23" width="2" height="6" fill="#FFF" rx="0.5" />
            {/* Right Earpad */}
            <rect x="32" y="21" width="5" height="10" rx="2.5" fill="#FF758F" stroke="#C9184A" strokeWidth="1.5" />
            <rect x="30" y="23" width="2" height="6" fill="#FFF" rx="0.5" />
            {/* Music Note */}
            <path d="M25 20 A 1.5 1.5 0 0 1 26.5 21.5 V15 H30 V17" stroke="#00D4FF" strokeWidth="1.5" fill="none" />
            <circle cx="25" cy="21.5" r="1.5" fill="#00D4FF" />
          </svg>
        );
      case 'sweater':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Sweater Body */}
            <path d="M10 16 H34 L37 26 H33 V38 H11 V26 H7 Z" fill="#FFE5EC" stroke="#FF758F" strokeWidth="2" strokeLinejoin="round" />
            {/* Ribbed neck collar */}
            <path d="M17 16 C17 14, 27 14, 27 16" stroke="#FF758F" strokeWidth="2.5" fill="none" />
            {/* Knitted Heart design on chest */}
            <path d="M20 23 A 2 2 0 0 1 22 23 A 2 2 0 0 1 24 23 Q 24 26, 22 28 Q 20 26, 20 23 Z" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1" />
            {/* Cuff ribbing */}
            <line x1="7" y1="26" x2="11" y2="26" stroke="#FF758F" strokeWidth="1.5" />
            <line x1="33" y1="26" x2="37" y2="26" stroke="#FF758F" strokeWidth="1.5" />
          </svg>
        );
      case 'lollipop':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Stick */}
            <line x1="22" y1="26" x2="22" y2="40" stroke="#B5B5B5" strokeWidth="2.5" strokeLinecap="round" />
            {/* Swirl Lollipop */}
            <circle cx="22" cy="18" r="10" fill="#FFE5EC" stroke="#FF758F" strokeWidth="2.5" />
            {/* Swirl lines */}
            <path d="M22 18 C19 18 17 20 19 22 C21 24 25 21 23 18 C22 16 19 16 17 18" stroke="#FF4D6D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Cute Ribbon on Stick */}
            <path d="M18 28 Q22 26 26 28 M18 28 L20 32 M26 28 L24 32" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'hoodie':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Hoodie Body & Sleeves */}
            <path d="M11 18 L6 26 L10 28 L13 22 V38 H31 V22 L34 28 L38 26 L33 18 Z" fill="#FFE5EC" stroke="#FF758F" strokeWidth="2" strokeLinejoin="round" />
            {/* Hood */}
            <path d="M15 18 C15 10, 29 10, 29 18 Z" fill="#FFB3C1" stroke="#FF758F" strokeWidth="2" />
            {/* Drawstrings */}
            <line x1="20" y1="18" x2="20" y2="24" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="24" y1="18" x2="24" y2="24" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Kangaroo pocket */}
            <path d="M16 30 H28 L26 36 H18 Z" fill="#FFD93D" stroke="#FF6B35" strokeWidth="1.5" />
          </svg>
        );
      case 'bracelet':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Bracelet Loop of Beads */}
            <path d="M12 22 C12 14, 32 14, 32 22 C32 30, 12 30, 12 22 Z" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Beads */}
            <circle cx="13" cy="18" r="2.5" fill="#FF758F" />
            <circle cx="16" cy="14" r="2.5" fill="#BF5FFF" />
            <circle cx="22" cy="13" r="2.5" fill="#FFD93D" />
            <circle cx="28" cy="14" r="2.5" fill="#00D4FF" />
            <circle cx="31" cy="18" r="2.5" fill="#FF758F" />
            <circle cx="31" cy="26" r="2.5" fill="#BF5FFF" />
            <circle cx="28" cy="30" r="2.5" fill="#FFD93D" />
            <circle cx="16" cy="30" r="2.5" fill="#00D4FF" />
            <circle cx="13" cy="26" r="2.5" fill="#FF758F" />
            {/* Charm */}
            <path d="M22 27 L22 30" stroke="#FFD93D" strokeWidth="1.5" />
            <path d="M20 32 A 1.5 1.5 0 0 1 22 32 A 1.5 1.5 0 0 1 24 32 Q 24 34.5, 22 36 Q 20 34.5, 20 32 Z" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1" />
          </svg>
        );
      case 'skincare':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Jar of Cream */}
            <rect x="8" y="24" width="14" height="12" rx="2" fill="#E0F7FA" stroke="#00D4FF" strokeWidth="2" />
            <rect x="7" y="21" width="16" height="3" rx="0.5" fill="#FFD93D" stroke="#C29D38" strokeWidth="1" />
            {/* Dropper Bottle */}
            <rect x="26" y="20" width="10" height="16" rx="2" fill="#FFE5EC" stroke="#FF758F" strokeWidth="2" />
            <rect x="29" y="16" width="4" height="4" fill="#D3D3D3" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="31" cy="13" r="2.5" fill="#FF4D6D" />
            {/* Sparkles */}
            <path d="M22 10 Q23.5 10 23.5 8.5 Q23.5 10 25 10 Q23.5 10 23.5 11.5 Q23.5 10 22 10 Z" fill="#FFD93D" />
          </svg>
        );
      case 'tumbler':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Tumbler Cup body */}
            <path d="M13 12 H31 L28 38 H16 Z" fill="#FFE5EC" stroke="#FF758F" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Lid */}
            <rect x="12" y="9" width="20" height="3" rx="1" fill="#FFD93D" stroke="#C29D38" strokeWidth="1.5" />
            {/* Straw */}
            <line x1="25" y1="9" x2="28" y2="4" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Handle */}
            <path d="M13 16 H9 V30 H13" stroke="#FF758F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Logo heart on cup */}
            <path d="M20 22 A 1.2 1.2 0 0 1 22 22 A 1.2 1.2 0 0 1 24 22 Q 24 24.5, 22 26.5 Q 20 24.5, 20 22 Z" fill="#FF4D6D" stroke="#C9184A" strokeWidth="0.8" />
          </svg>
        );
      case 'bouquet':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Wrapper cone paper */}
            <path d="M12 18 L22 38 L32 18 Z" fill="#DDB892" stroke="#7F5539" strokeWidth="2" strokeLinejoin="round" />
            <path d="M22 38 L16 22 L22 18 L28 22 Z" fill="#EAD257" opacity="0.5" />
            {/* Flowers peaking out */}
            <circle cx="16" cy="14" r="4.5" fill="#FF4D6D" stroke="#C9184A" strokeWidth="1.5" />
            <circle cx="16" cy="14" r="1.5" fill="#FFD93D" />
            
            <circle cx="28" cy="14" r="4.5" fill="#FF758F" stroke="#C9184A" strokeWidth="1.5" />
            <circle cx="28" cy="14" r="1.5" fill="#FFD93D" />
            
            <circle cx="22" cy="10" r="5" fill="#BF5FFF" stroke="#7C00FE" strokeWidth="1.5" />
            <circle cx="22" cy="10" r="1.5" fill="#FFD93D" />
            {/* Ribbon bow wrapping */}
            <path d="M18 28 Q22 30 26 28 M18 28 L22 33 L26 28" stroke="#FF4D6D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        );
      case 'hairbow':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Left loop of the bow */}
            <path d="M22 22 Q13 13 12 20 Q12 27 22 22" fill="#FF758F" stroke="#C9184A" strokeWidth="2" strokeLinejoin="round" />
            {/* Right loop of the bow */}
            <path d="M22 22 Q31 13 32 20 Q32 27 22 22" fill="#FF758F" stroke="#C9184A" strokeWidth="2" strokeLinejoin="round" />
            {/* Center knot */}
            <circle cx="22" cy="22" r="3" fill="#FF4D6D" stroke="#C9184A" strokeWidth="2" />
            {/* Left ribbon tail */}
            <path d="M20 24 L14 36 L19 33 L21 24" fill="#FF758F" stroke="#C9184A" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Right ribbon tail */}
            <path d="M24 24 L30 36 L25 33 L23 24" fill="#FF758F" stroke="#C9184A" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        );
      case 'wish':
        return (
          <svg viewBox="0 0 44 44" width="48" height="48" fill="none">
            {/* Gift Box */}
            <rect x="8" y="18" width="28" height="18" rx="2" fill="#FF4D6D" stroke="#C9184A" strokeWidth="2" />
            <rect x="6" y="12" width="32" height="7" rx="1.5" fill="#FF758F" stroke="#C9184A" strokeWidth="2" />
            {/* Ribbon */}
            <rect x="20" y="12" width="4" height="24" fill="#FFD93D" />
            {/* Bow */}
            <path d="M19 12 C14 4 15 13 19 12.5" fill="none" stroke="#FFD93D" strokeWidth="2" />
            <path d="M25 12 C30 4 29 13 25 12.5" fill="none" stroke="#FFD93D" strokeWidth="2" />
            <circle cx="22" cy="12.5" r="2.5" fill="#FFF176" />
          </svg>
        );
      default:
        return null;
    }
  };

  const page = STORY_PAGES[currentPage];

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--grad-screen5)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aurora backdrop */}
      <div className="aurora-orb aurora-orb-1" style={{ top: '5%', left: '5%', width: '300px', height: '300px', background: '#BF5FFF', opacity: 0.3 }} />
      <div className="aurora-orb aurora-orb-2" style={{ bottom: '5%', right: '5%', width: '320px', height: '320px', background: '#FF2D78', opacity: 0.25 }} />

      {/* Floating particles */}
      <FloatingParticles types={['sparkles', 'confetti']} />

      {/* Header */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '16px', zIndex: 1 }}>
        <h1
          className="gradient-text"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 4px 0',
            filter: 'drop-shadow(0 0 15px rgba(255,45,120,0.5))',
          }}
        >
          25 Notes for 25 Years 💖
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#FFF8F0',
            opacity: 0.9,
            margin: 0,
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          Read the story of our friendship 📖
        </p>
      </div>

      {/* Cute hand-holding illustration */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <svg
          viewBox="0 0 320 160"
          style={{ width: '100%', maxWidth: '140px', margin: '0 auto 12px auto', display: 'block', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="body-shirt-fg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#80E5FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <linearGradient id="body-pants-fg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6C7A89" />
              <stop offset="100%" stopColor="#3F4E5A" />
            </linearGradient>
            <linearGradient id="body-dress-fg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E1BEE7" />
              <stop offset="100%" stopColor="#BF5FFF" />
            </linearGradient>
          </defs>
          
          <ellipse cx="160" cy="148" rx="50" ry="4.5" fill="#7C00FE" opacity="0.25" />

          {/* Boy */}
          <g transform="translate(140, 85)">
            <ellipse cx="0" cy="-14" rx="12" ry="12" fill="#4A2912" stroke="#251206" strokeWidth="2" />
            <ellipse cx="0" cy="-3" rx="10" ry="10" fill="#FFCBA4" stroke="#D39673" strokeWidth="2" />
            <circle cx="-3" cy="-4" r="1.2" fill="#2E1C0C" />
            <circle cx="3" cy="-4" r="1.2" fill="#2E1C0C" />
            <ellipse cx="-6" cy="-1" rx="2" ry="1" fill="#FF2D78" opacity="0.3" />
            <ellipse cx="6" cy="-1" rx="2" ry="1" fill="#FF2D78" opacity="0.3" />
            <path d="M-2 2 Q0 4 2 2" stroke="#2E1C0C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M-10 10 Q-12 30 -9 38 L9 38 Q12 30 10 10 Z" fill="url(#body-shirt-fg)" stroke="#00A8CC" strokeWidth="2" />
            <path d="M-9 38 L9 38 L8 48 L2 48 L2 42 L-2 42 L-2 48 L-8 48 Z" fill="url(#body-pants-fg)" stroke="#1C252C" strokeWidth="2" />
            <rect x="-5" y="48" width="4" height="12" rx="1.5" fill="#FFCBA4" stroke="#D39673" strokeWidth="1.5" />
            <rect x="1" y="48" width="4" height="12" rx="1.5" fill="#FFCBA4" stroke="#D39673" strokeWidth="1.5" />
            <path d="M9 16 Q18 20 17 30" stroke="#FFCBA4" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Girl */}
          <g transform="translate(180, 93)">
            <path d="M-12 -8 Q-18 12 -15 28 Q-12 35 -9 32" fill="#1A1A2E" stroke="#05050F" strokeWidth="2" />
            <path d="M12 -8 Q18 12 15 28 Q12 32 9 29" fill="#1A1A2E" stroke="#05050F" strokeWidth="2" />
            <ellipse cx="0" cy="-2" rx="9.5" ry="9.5" fill="#E8B896" stroke="#C49170" strokeWidth="2" />
            <circle cx="-2.5" cy="-3.5" r="1.2" fill="#2E1C0C" />
            <circle cx="2.5" cy="-3.5" r="1.2" fill="#2E1C0C" />
            <ellipse cx="-5" cy="0" rx="1.5" ry="0.8" fill="#FF2D78" opacity="0.3" />
            <ellipse cx="5" cy="0" rx="1.5" ry="0.8" fill="#FF2D78" opacity="0.3" />
            <path d="M-2 2.5 Q0 4.5 2 2.5" stroke="#2E1C0C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M-11 8 Q-13 36 -9 50 L9 50 Q13 36 11 8 Z" fill="url(#body-dress-fg)" stroke="#7C00FE" strokeWidth="2" />
            <rect x="-6" y="50" width="4" height="12" rx="1.5" fill="#E8B896" stroke="#C49170" strokeWidth="1.5" />
            <rect x="2" y="50" width="4" height="12" rx="1.5" fill="#E8B896" stroke="#C49170" strokeWidth="1.5" />
            <path d="M-9 15 Q-17 18 -17 22" stroke="#E8B896" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Story Card Container */}
      <div
        ref={cardRef}
        className="story-card glass-card"
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '24px',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          textAlign: 'center',
          zIndex: 1,
          willChange: 'transform, opacity',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* Note Counter */}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#FFD93D',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '12px',
          }}
        >
          {currentPage === 25 ? 'Special Wish 💌' : `Note ${currentPage + 1} of 25`}
        </span>

        {/* Dynamic Graphic SVG */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', height: '52px', alignItems: 'center' }}>
          {renderSVGIcon(page.iconType)}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '26px',
            fontWeight: 800,
            color: '#FFF8F0',
            margin: '0 0 10px 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {page.title}
        </h2>

        {/* Text Message */}
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13.5px',
            lineHeight: 1.6,
            color: '#FFF8F0',
            margin: 0,
            opacity: 0.95,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          {page.message}
        </p>
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '380px',
          zIndex: 1,
          gap: '12px',
        }}
      >
        {/* Current Number Indicator */}
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#FFD93D',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            animation: currentPage === 25 ? 'heartbeat 1.2s infinite' : 'none',
          }}
        >
          <style>{`
            @keyframes heartbeat {
              0% { transform: scale(1); }
              30% { transform: scale(1.2); }
              60% { transform: scale(1); }
              100% { transform: scale(1); }
            }
          `}</style>
          {currentPage === 25 ? (
            <>
              Special Wish 💖
            </>
          ) : (
            <>
              Note {currentPage + 1} of 25 🎁
            </>
          )}
        </span>

        {/* Buttons Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '16px',
          }}
        >
          {/* Back Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#FFF8F0',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: '50px',
              padding: '10px 20px',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 0 ? 0.3 : 0.9,
              transition: 'all 0.2s',
              minWidth: '44px',
              minHeight: '44px',
            }}
          >
            ← Back
          </button>

          {/* Next / Continue Button */}
          <button
            onClick={handleNext}
            className="glow-btn-gold"
            style={{
              padding: '10px 24px',
              fontSize: '13px',
              boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)',
            }}
            aria-label={currentPage === 25 ? 'See your forever message' : currentPage === 24 ? 'See your special wish' : 'Next page'}
          >
            {currentPage === 24 ? 'See special wish 💌 ➔' : currentPage === 25 ? 'See forever message ➔' : 'Next ➔'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendshipGifts;
