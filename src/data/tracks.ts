import { Track } from '@/types/tracks';

export const BEGINNER_TRACK: Track = {
  id: 'beginner',
  name: 'My First Piano',
  description: 'Start here! Very simple songs with big keys — perfect for young learners',
  icon: '🌟',
  color: '#22cc88',
  levels: [
    { levelNumber: 1, songId: 'beginner-hot-cross-buns', title: 'Hot Cross Buns', description: 'Just 3 notes — the easiest song!', requiredStars: 0, xpReward: 30 },
    { levelNumber: 2, songId: 'beginner-rain-rain', title: 'Rain Rain Go Away', description: 'Another 3-note melody', requiredStars: 0, xpReward: 30 },
    { levelNumber: 3, songId: 'beginner-au-clair', title: 'Au Clair de la Lune', description: 'A pretty French song with 3 notes', requiredStars: 1, xpReward: 40 },
    { levelNumber: 4, songId: 'beginner-lightly-row', title: 'Lightly Row', description: 'Your first 4-note song!', requiredStars: 1, xpReward: 50 },
    { levelNumber: 5, songId: 'beginner-row-row-row', title: 'Row Row Row Your Boat', description: 'A fun song with 5 notes', requiredStars: 1, xpReward: 60, unlocksBadge: 'first-steps' },
  ],
};

export const SUZUKI_TRACK: Track = {
  id: 'suzuki',
  name: 'Suzuki Method',
  description: 'The world-famous piano method, from beginner to master',
  icon: '🎹',
  color: '#ff6633',
  levels: [
    // Book 1 - Beginner
    { levelNumber: 1, songId: 'suzuki-twinkle-var-a', title: 'Twinkle Var. A', description: 'Rhythmic variation of the classic', requiredStars: 0, xpReward: 50 },
    { levelNumber: 2, songId: 'suzuki-twinkle-var-b', title: 'Twinkle Var. B', description: 'Dotted rhythm variation', requiredStars: 1, xpReward: 50 },
    { levelNumber: 3, songId: 'suzuki-french-folk-song', title: 'French Folk Song', description: 'A charming folk melody', requiredStars: 1, xpReward: 60 },
    { levelNumber: 4, songId: 'suzuki-london-bridge', title: 'London Bridge', description: 'The classic nursery rhyme', requiredStars: 1, xpReward: 60 },
    { levelNumber: 5, songId: 'suzuki-go-tell-aunt-rhody', title: 'Go Tell Aunt Rhody', description: 'A traditional folk song', requiredStars: 1, xpReward: 70 },
    { levelNumber: 6, songId: 'suzuki-long-long-ago', title: 'Long Long Ago', description: 'A sentimental classic', requiredStars: 1, xpReward: 70 },
    { levelNumber: 7, songId: 'suzuki-allegro', title: 'Allegro', description: 'Your first fast piece!', requiredStars: 1, xpReward: 100 },
    { levelNumber: 8, songId: 'suzuki-perpetual-motion', title: 'Perpetual Motion', description: 'Non-stop flowing notes', requiredStars: 2, xpReward: 120 },
    { levelNumber: 9, songId: 'suzuki-allegretto', title: 'Allegretto', description: 'Graceful and light', requiredStars: 1, xpReward: 100 },
    { levelNumber: 10, songId: 'suzuki-andantino', title: 'Andantino', description: 'Slow and expressive', requiredStars: 1, xpReward: 100 },
    { levelNumber: 11, songId: 'suzuki-musette', title: 'Musette (Bach)', description: 'Your first Bach piece!', requiredStars: 2, xpReward: 120, unlocksBadge: 'first-bach' },
    { levelNumber: 12, songId: 'suzuki-minuet-1', title: 'Minuet 1 (Bach)', description: 'The famous Minuet in G', requiredStars: 2, xpReward: 150 },
    { levelNumber: 13, songId: 'suzuki-minuet-2', title: 'Minuet 2 (Bach)', description: 'The companion to Minuet 1', requiredStars: 2, xpReward: 150 },
    { levelNumber: 14, songId: 'suzuki-minuet-3', title: 'Minuet 3 (Bach)', description: 'The most challenging minuet', requiredStars: 2, xpReward: 200, unlocksBadge: 'suzuki-book1' },
  ],
};

export const POPULAR_TRACK: Track = {
  id: 'popular',
  name: 'Popular Songs',
  description: 'Learn your favorite hits, from easy to challenging',
  icon: '🎤',
  color: '#3366ff',
  levels: [
    { levelNumber: 1, songId: 'popular-happy-birthday', title: 'Happy Birthday', description: 'Everyone knows this one!', requiredStars: 0, xpReward: 50 },
    { levelNumber: 2, songId: 'popular-jingle-bells', title: 'Jingle Bells', description: 'A holiday classic', requiredStars: 1, xpReward: 60 },
    { levelNumber: 3, songId: 'popular-somewhere-over-rainbow', title: 'Over the Rainbow', description: 'The iconic melody', requiredStars: 1, xpReward: 100 },
    { levelNumber: 4, songId: 'popular-let-it-go', title: 'Let It Go', description: 'From Frozen', requiredStars: 2, xpReward: 120 },
    { levelNumber: 5, songId: 'popular-can-you-feel-the-love', title: 'Can You Feel the Love', description: 'Elton John classic', requiredStars: 2, xpReward: 120 },
  ],
};

export const CLASSICS_TRACK: Track = {
  id: 'classics',
  name: 'Classical & Traditional',
  description: 'Timeless melodies from the great composers',
  icon: '🎻',
  color: '#9933ff',
  levels: [
    { levelNumber: 1, songId: 'twinkle-twinkle', title: 'Twinkle Twinkle', description: 'The perfect starting point', requiredStars: 0, xpReward: 50 },
    { levelNumber: 2, songId: 'mary-had-a-little-lamb', title: 'Mary Had a Little Lamb', description: 'Simple and sweet', requiredStars: 1, xpReward: 50 },
    { levelNumber: 3, songId: 'ode-to-joy', title: 'Ode to Joy', description: 'Beethoven\'s masterpiece', requiredStars: 1, xpReward: 100 },
    { levelNumber: 4, songId: 'fur-elise', title: 'Fur Elise', description: 'The iconic piano piece', requiredStars: 2, xpReward: 120 },
    { levelNumber: 5, songId: 'canon-in-d', title: 'Canon in D', description: 'Pachelbel\'s magnum opus', requiredStars: 2, xpReward: 150 },
  ],
};

export const ALL_TRACKS: Track[] = [BEGINNER_TRACK, SUZUKI_TRACK, POPULAR_TRACK, CLASSICS_TRACK];
