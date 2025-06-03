import { InteractiveCLI } from "./interactive-cli.js";

const cli = new InteractiveCLI();

console.log("🌍 Khởi động hệ thống giả lập xã hội...\n");

cli.start().catch((error) => {
  console.error("❌ Lỗi khởi động CLI:", error);
  process.exit(1);
});
