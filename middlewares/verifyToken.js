const jwt = require("jsonwebtoken");

// 1. التحقق من وجود التوكن وفك تشفيره
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      // فك التوكن واستخراج بيانات المستخدم (id, role, isAdmin)
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
      req.user = decoded; 
      next(); // إذا التوكن صح، كمل شغلك
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

// 2. التحقق إن المستخدم رئيس نادي أو أدمن
const verifyTokenAndClubLeader = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "CLUB_LEADER" || req.user.isAdmin) {
      next(); // مسموح له يكمل
    } else {
      res.status(403).json({ message: "Not allowed, only Club Leaders can create events!" });
    }
  });
};

module.exports = { 
  verifyToken, 
  verifyTokenAndClubLeader 
};
