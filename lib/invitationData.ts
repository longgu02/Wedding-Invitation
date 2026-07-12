export const invitation = {
  slug: "tuanlong-khanhchi",
  siteTitle: "Thiệp Cưới Tuấn Long & Khánh Chi",
  headerGreeting: "Happy Wedding",

  groom: {
    fullName: "Phạm Tuấn Long",
    shortName: "Tuấn Long",
    father: "Phạm Anh Tuấn",
    mother: "Nguyễn Thị Thúy",
    parentTitle: "Ông Bà",
    sideLabel: "Nhà Trai",
    sideLabelEn: "The Groom's Family",
    // TODO: sửa lại quê quán gia đình cho đúng
  },
  bride: {
    fullName: "Nguyễn Khánh Chi",
    shortName: "Khánh Chi",
    father: "Nguyễn Việt Phương",
    mother: "Nguyễn Thị Kim Thu",
    parentTitle: "Ông Bà",
    sideLabel: "Nhà Gái",
    sideLabelEn: "The Bride's Family",
    // TODO: sửa lại quê quán gia đình cho đúng
  },
  groomFirst: true,

  quote:
    "Hạnh phúc không phải là điểm đến, mà là con đường chúng ta đi cùng nhau.",

  date: "2026-07-26",
  time: "10:00",
  timezone: "Asia/Bangkok",
  venueName: "The One",
  address: "Số 2 Chương Dương Độ, phường Hồng Hà, Hà Nội",
  // Ảnh địa điểm (dummy) — thay bằng ảnh thật của bạn tại public/images/venue/venue.jpg
  venueImage: "/images/venue/venue.jpg",

  mapEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("The One, Số 2 Chương Dương Độ, phường Hồng Hà, Hà Nội") +
    "&output=embed",

  gallery: [
    { url: "/images/gallery/photo-1.jpg" },
    { url: "/images/gallery/photo-2.jpg" },
    { url: "/images/gallery/photo-3.jpg" },
    { url: "/images/gallery/photo-4.jpg" },
    { url: "/images/gallery/photo-5.jpg" },
    { url: "/images/gallery/photo-6.jpg" },
    { url: "/images/gallery/photo-7.jpg" },
  ],
  ogImage: "/og.jpg",

  decorFlower: "/images/decor/hoa.webp",
  logo: "/images/logo-removebg-preview.png",
  music: "/music/ABG.mp3",

  // Gift box / bank info — intentionally blank, same as the source invite.
  // Fill these in before going live; see README for instructions.
  gift: {
    groomBankName: "",
    groomBankAccountName: "",
    groomBankAccountNumber: "",
    groomBankQr: "/images/bank/trai.jpg",
    brideBankName: "",
    brideBankAccountName: "",
    brideBankAccountNumber: "",
    brideBankQr: "/images/bank/gai.jpg",
  },

  flags: {
    showMap: true,
    showBank: true,
    showRsvp: true,
    showGuestbook: true,
    showThankYou: true,
    showFamilyInfo: true,
    showTimeline: false,
  },

  labels: {
    tapToOpen: "Nhấn để mở",
    envelopeOpenButton: "Mở thiệp",
    envelopeGreeting: "Thân Mời",
    envelopeInviteMessage: "Đến dự buổi tiệc chung vui cùng gia đình",
    weddingTitle: "Happy Wedding",
    atTime: "VÀO LÚC",
    countdown: "Cùng đếm ngược",
    heroTitle: "Câu Chuyện Tình Yêu",
    venueBadge: "Địa Điểm",
    familyTitle: "Gia đình hai bên",
    familySubtitle:
      "Niềm vinh hạnh và sự tự hào lớn nhất của chúng tôi là được sự đồng ý và chúc phúc từ gia đình.",
    fatherLabel: "Thân Phụ",
    motherLabel: "Thân Mẫu",
    familyLocationPrefix: "Gia đình tại",
    ceremonyHeading: "Lễ Thành Hôn",
    receptionHeading: "Tiệc Cưới",
    ceremonyInfoTitle: "THÔNG TIN LỄ CƯỚI",
    receptionInfoTitle: "THÔNG TIN TIỆC CƯỚI",
    receptionAt: "Tiệc cưới sẽ diễn ra vào lúc:",
    mapTitle: "BẢN ĐỒ",
    weddingAlbum: "Album Ảnh Cưới",
    giftBox: "Hộp Mừng Cưới",
    giftBoxLegacyLabel: "Mừng Cưới",
    giftBoxThankYou: "Cảm ơn bạn đã đồng hành cùng chúng mình trong ngày trọng đại!",
    saveQR: "Lưu QR",
    qrScanText: "Quét mã để gửi mừng cưới",
    rsvpTitle: "Xác nhận tham dự",
    rsvpSubtitle:
      "Sự hiện diện của {{salutation}} là niềm vinh hạnh cho gia đình chúng tôi. Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất.",
    rsvpButton: "XÁC NHẬN",
    rsvpAttendQuestion: "{{Salutation}} sẽ đến chứ?",
    rsvpAttendYes: "Tôi sẽ đến",
    rsvpAttendNo: "Rất tiếc, tôi không thể đến",
    rsvpNameLabel: "Tên của {{salutation}}",
    rsvpNamePlaceholder: "Nhập tên của {{salutation}}",
    rsvpGuestCountLabel: "Số lượng khách (bao gồm {{salutation}})",
    rsvpMessageLabel: "Lời nhắn cho cô dâu chú rể",
    rsvpMessagePlaceholder: "Để lại lời nhắn (không bắt buộc)",
    rsvpSubmitText: "Gửi xác nhận",
    rsvpSendingText: "Đang gửi...",
    rsvpErrorText: "Có lỗi xảy ra. Vui lòng thử lại.",
    rsvpThankYouTitle: "Cảm ơn {{salutation}}!",
    rsvpConfirmationReceivedText: "Chúng tôi đã nhận được xác nhận của {{salutation}}.",
    rsvpDeclineMessageText:
      "Cảm ơn {{salutation}} đã hồi âm. Chúc {{salutation}} thật nhiều niềm vui và sức khỏe!",
    rsvpLookForwardText: "Rất mong được gặp {{salutation}} trong ngày trọng đại!",
    rsvpCloseText: "Đóng",
    guestSalutation: "bạn",
    guestbook: "Sổ lưu bút",
    noWishesYet: "Chưa có lời chúc nào. Hãy là người đầu tiên!",
    guestNamePlaceholder: "Nhập tên*",
    guestWishPlaceholder: "Nhập lời chúc*",
    submitWishText: "GỬI LỜI CHÚC",
    submittingText: "ĐANG GỬI...",
    wishSavedText: "Cảm ơn bạn! Lời chúc đã được lưu.",
    thankYouNote: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
    addToCalendar: "Thêm vào lịch",
  },
} as const;

export type Invitation = typeof invitation;
