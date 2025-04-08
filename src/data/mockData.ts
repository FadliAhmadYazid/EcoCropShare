import { User, Post, Request, Article, Comment, History } from '../models/types';

// Mock Users
export const mockUsers: User[] = [
    {
      id: '1',
      name: 'Rizky Yusmansyah',
      email: 'rizky@example.com',
      location: 'Banda Aceh',
      favoritePlants: ['Tomat', 'Cabai'],
      profileImage: '../../src/assets/images/rizky.jpg',
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Fadli Ahmad',
      email: 'fadli@example.com',
      location: 'Banda Aceh',
      favoritePlants: ['Bayam', 'Kangkung'],
      profileImage: '../../src/assets/images/fadli.jpeg',
      createdAt: new Date('2023-02-20')
    },
    {
      id: '3',
      name: 'Andi Wijaya',
      email: 'andi@example.com',
      location: 'Surabaya',
      favoritePlants: ['Jagung', 'Kacang Panjang'],
      profileImage: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww',
      createdAt: new Date('2023-03-10')
    },
  ];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: '1',
    userId: '2',
    parentId: '1',
    parentType: 'post',
    content: 'Apakah bibit tomat ini masih tersedia?',
    createdAt: new Date('2023-06-15T10:30:00')
  },
  {
    id: '2',
    userId: '1',
    parentId: '1',
    parentType: 'post',
    content: 'Iya, masih tersedia. Silakan hubungi saya.',
    createdAt: new Date('2023-06-15T11:45:00')
  },
  {
    id: '3',
    userId: '3',
    parentId: '2',
    parentType: 'post',
    content: 'Saya tertarik dengan cabai rawitnya. Bisa tukar dengan bibit kangkung saya.',
    createdAt: new Date('2023-06-20T09:15:00')
  },
  {
    id: '4',
    userId: '2',
    parentId: '1',
    parentType: 'request',
    content: 'Saya punya beberapa bibit bayam yang bisa saya bagikan.',
    createdAt: new Date('2023-07-05T14:20:00')
  },
];

// Mock Posts
export const mockPosts: Post[] = [
    {
      id: '1',
      userId: '1',
      title: 'Bibit Tomat Cherry Organik',
      type: 'seed',
      quantity: 20,
      location: 'Jakarta Selatan',
      images: ['https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'],
      description: 'Bibit tomat cherry hasil budidaya sendiri. Bebas pestisida dan sudah siap tanam.',
      status: 'available',
      createdAt: new Date('2023-06-10'),
      updatedAt: new Date('2023-06-10'),
      comments: mockComments.filter(c => c.parentId === '1' && c.parentType === 'post')
  },
    {
      id: '2',
      userId: '2',
      title: 'Cabai Rawit Surplus',
      type: 'harvest',
      quantity: 500,
      location: 'Bandung',
      images: ['https://images.unsplash.com/photo-1526346698789-22fd84314424?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2F5ZW5uZSUyMHBlcHBlcnxlbnwwfHwwfHx8MA%3D%3D'],
      description: 'Hasil panen cabai rawit yang berlebih. Sangat pedas dan segar.',
      status: 'available',
      createdAt: new Date('2023-06-18'),
      updatedAt: new Date('2023-06-18'),
      comments: mockComments.filter(c => c.parentId === '2' && c.parentType === 'post')
    },
    {
      id: '3',
      userId: '3',
      title: 'Bibit Jagung Manis',
      type: 'seed',
      quantity: 30,
      location: 'Surabaya',
      images: ['https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ybnxlbnwwfHwwfHx8MA%3D%3D'],
      description: 'Bibit jagung manis varietas unggul. Hasil panen dalam 60-70 hari.',
      status: 'completed',
      createdAt: new Date('2023-05-25'),
      updatedAt: new Date('2023-06-30'),
      comments: []
    },
    {
      id: '4',
      userId: '1',
      title: 'Kangkung Siap Panen',
      type: 'harvest',
      quantity: 2,
      location: 'Jakarta Timur',
      images: ['https://media.istockphoto.com/id/489726734/photo/young-water-spinach.webp?a=1&b=1&s=612x612&w=0&k=20&c=tHxIcrCIzf5a1bRMwREr5ZOU_LQaDppubq2LZZXZv8Q='],
      description: 'Kangkung hidroponik segar, baru dipanen pagi ini. Dalam satuan ikat.',
      status: 'available',
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2023-07-01'),
      comments: []
    },
  ];

// Mock Requests
export const mockRequests: Request[] = [
  {
    id: '1',
    userId: '3',
    plantName: 'Bibit Bayam',
    location: 'Surabaya',
    reason: 'Ingin mencoba menanam bayam di lahan kosong samping rumah.',
    status: 'open',
    createdAt: new Date('2023-07-02'),
    updatedAt: new Date('2023-07-02'),
    comments: mockComments.filter(c => c.parentId === '1' && c.parentType === 'request')
  },
  {
    id: '2',
    userId: '1',
    plantName: 'Bibit Terong Ungu',
    location: 'Jakarta',
    reason: 'Mencari bibit terong unggul untuk ditanam di kebun komunitas.',
    status: 'open',
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2023-07-05'),
    comments: []
  },
  {
    id: '3',
    userId: '2',
    plantName: 'Daun Mint',
    location: 'Bandung',
    reason: 'Butuh daun mint segar untuk eksperimen membuat teh herbal.',
    status: 'fulfilled',
    createdAt: new Date('2023-06-25'),
    updatedAt: new Date('2023-07-01'),
    comments: []
  },
];

// Mock Articles
export const mockArticles: Article[] = [
    {
      id: '1',
      userId: '2',
      title: 'Cara Mudah Menanam Tomat di Pot',
      content: `Menanam tomat di pot sangat mudah dilakukan bahkan untuk pemula. Berikut langkah-langkahnya:
  
  1. Pilih pot berukuran minimal 30 cm diameter dengan lubang drainase.
  2. Isi dengan campuran tanah, kompos, dan pupuk organik.
  3. Tanam bibit tomat sedalam 1-2 cm dan beri jarak antar tanaman.
  4. Siram secukupnya, jaga kelembaban tapi hindari genangan air.
  5. Letakkan di tempat yang terkena sinar matahari minimal 6 jam sehari.
  6. Beri ajir atau tongkat untuk menopang tanaman saat tumbuh besar.
  7. Panen dalam 60-80 hari tergantung varietas.
  
  Selamat mencoba!`,
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Budidaya',
      tags: ['tomat', 'pot', 'pemula', 'panduan'],
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date('2023-06-15')
    },
    {
      id: '2',
      userId: '1',
      title: 'Membuat Pupuk Kompos dari Limbah Dapur',
      content: `Pupuk kompos bisa dibuat dari limbah dapur dengan mudah. Ikuti cara berikut:
  
  1. Siapkan wadah kompos dengan lubang ventilasi.
  2. Kumpulkan limbah organik seperti sisa sayuran, kulit buah, dan ampas kopi.
  3. Hindari memasukkan daging, ikan, atau produk susu.
  4. Tambahkan lapisan tanah atau daun kering di antara lapisan limbah.
  5. Aduk campuran setiap minggu untuk aerasi.
  6. Jaga kelembaban tapi jangan terlalu basah.
  7. Dalam 2-3 bulan, kompos siap digunakan saat teksturnya seperti tanah dan berbau tanah yang segar.
  
  Gunakan kompos ini untuk menyuburkan tanaman Anda secara alami dan mengurangi sampah rumah tangga.`,
      image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Pupuk Organik',
      tags: ['kompos', 'daur ulang', 'pupuk', 'organik'],
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2023-07-03')
    },
    {
      id: '3',
      userId: '3',
      title: 'Tips Mengatasi Hama Tanaman Secara Organik',
      content: `Mengatasi hama tanaman tidak harus dengan pestisida kimia. Berikut cara organik yang bisa dicoba:
  
  1. Air sabun: Campurkan sabun cuci piring dengan air dan semprotkan ke tanaman untuk mengusir kutu daun dan tungau.
  
  2. Bawang putih: Rendam bawang putih cincang dalam air semalam, saring dan semprotkan ke tanaman untuk mencegah berbagai hama.
  
  3. Cabai: Buat larutan cabai dan semprotkan untuk mengusir serangga pemakan daun.
  
  4. Predator alami: Tanam tanaman yang menarik predator alami seperti ladybug dan capung yang memakan hama.
  
  5. Companion planting: Tanam tanaman pendamping seperti kemangi di dekat tomat untuk mengusir hama tertentu.
  
  6. Rotasi tanaman: Ganti jenis tanaman setiap musim untuk mencegah hama menetap.
  
  7. Jaring fisik: Gunakan jaring halus untuk menghalangi kupu-kupu dan ngengat bertelur di tanaman.
  
  Metode-metode ini lebih ramah lingkungan dan aman untuk konsumsi.`,
      image: 'https://images.unsplash.com/photo-1720115587616-62ec66117dd4?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Perawatan',
      tags: ['hama', 'organik', 'pengendalian', 'alami'],
      createdAt: new Date('2023-06-28'),
      updatedAt: new Date('2023-06-28')
    },
    {
      id: '4',
      userId: '2',
      title: 'Panduan Berkebun Vertikal untuk Ruang Terbatas',
      content: `Berkebun vertikal adalah solusi tepat bagi Anda yang memiliki keterbatasan ruang. Berikut panduan lengkapnya:
  
  1. Pilih lokasi yang tepat, idealnya mendapat sinar matahari 4-6 jam per hari
  2. Tentukan sistem yang sesuai: pot gantung, rak bertingkat, pallet, atau sistem hidroponik vertikal
  3. Pilih tanaman yang tepat: herbal, selada, stroberi, atau tanaman kecil lainnya
  4. Pastikan drainase yang baik untuk mencegah genangan air
  5. Buat jadwal penyiraman yang teratur, biasanya lebih sering karena media tanam lebih kecil
  6. Gunakan media tanam ringan namun dapat menahan air dengan baik
  7. Rotasi tanaman untuk mencegah kekurangan nutrisi
  
  Berkebun vertikal tidak hanya menghemat ruang tetapi juga menambah nilai estetika pada tempat tinggal Anda.`,
      image: 'https://plus.unsplash.com/premium_photo-1677756429620-84491608741a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Teknik Tanam',
      tags: ['vertikal', 'urban farming', 'ruang terbatas', 'dekorasi'],
      createdAt: new Date('2023-07-12'),
      updatedAt: new Date('2023-07-12')
    },
    {
      id: '5',
      userId: '1',
      title: 'Teknik Menyemai Benih untuk Hasil Optimal',
      content: `Penyemaian benih yang benar akan menentukan keberhasilan tumbuh kembang tanaman Anda. Ikuti langkah-langkah berikut:
  
  1. Pilih media semai yang steril dan ringan, kombinasi cocopeat dan perlite ideal
  2. Rendam benih beberapa jam sebelum disemai untuk mempercepat perkecambahan
  3. Jaga kelembaban dengan menutup wadah semai menggunakan plastik transparan
  4. Letakkan di tempat hangat dengan cahaya tidak langsung selama masa perkecambahan
  5. Setelah muncul daun sejati, mulai berikan pupuk cair dengan konsentrasi rendah
  6. Hardening off: kenalkan bibit secara perlahan ke lingkungan luar sebelum ditanam
  7. Transplantasi dengan hati-hati saat bibit memiliki 2-4 set daun sejati
  
  Kesabaran adalah kunci dalam proses penyemaian. Dengan teknik yang tepat, Anda akan mendapatkan bibit berkualitas untuk ditanam.`,
      image: 'https://images.unsplash.com/photo-1615469619480-1a7e77deb56c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Pembibitan',
      tags: ['benih', 'penyemaian', 'bibit', 'pembibitan'],
      createdAt: new Date('2023-06-20'),
      updatedAt: new Date('2023-06-22')
    },
    {
      id: '6',
      userId: '3',
      title: 'Menanam Sayuran Hidroponik untuk Pemula',
      content: `Hidroponik adalah teknik menanam tanpa tanah yang semakin populer. Berikut panduan untuk pemula:
  
  1. Pilih sistem hidroponik sederhana untuk pemula: sistem rakit apung atau wick system
  2. Siapkan nutrisi hidroponik sesuai jenis tanaman yang akan ditanam
  3. Mulai dengan tanaman mudah seperti selada, kangkung, atau bayam
  4. Gunakan media tanam inert seperti rockwool, cocopeat, atau hidroton
  5. Pastikan sirkulasi oksigen cukup jika menggunakan sistem dengan genangan air
  6. Periksa pH larutan nutrisi secara berkala (idealnya 5.5-6.5 untuk kebanyakan sayuran)
  7. Jaga kebersihan sistem untuk mencegah penyakit dan algae
  
  Hidroponik memberikan hasil yang lebih cepat dan bersih dibandingkan bercocok tanam konvensional.`,
      image: 'https://images.unsplash.com/photo-1667509860948-46d20f127b43?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Hidroponik',
      tags: ['hidroponik', 'tanpa tanah', 'modern', 'urban farming'],
      createdAt: new Date('2023-07-08'),
      updatedAt: new Date('2023-07-10')
    }
  ];

// Mock History
export const mockHistory: History[] = [
  {
    id: '1',
    postId: '3',
    userId: '3',
    partnerId: '1',
    plantName: 'Bibit Jagung Manis',
    date: new Date('2023-06-30'),
    notes: 'Ditukar dengan bibit tomat dari Rizky.',
    type: 'post'
  },
  {
    id: '2',
    requestId: '3',
    userId: '2',
    partnerId: '1',
    plantName: 'Daun Mint',
    date: new Date('2023-07-01'),
    notes: 'Permintaan terpenuhi oleh Budi yang memiliki kebun mint.',
    type: 'request'
  },
];

// Current User (simulates logged in user)
export const currentUser: User = mockUsers[0];