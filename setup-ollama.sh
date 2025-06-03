#!/bin/bash

echo "🔍 Kiểm tra Ollama..."

# Kiểm tra xem Ollama có được cài đặt không
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama chưa được cài đặt!"
    echo "📥 Vui lòng cài đặt Ollama từ: https://ollama.ai/"
    exit 1
fi

echo "✅ Ollama đã được cài đặt"

# Kiểm tra xem Ollama server có đang chạy không
if ! curl -s http://localhost:11434/api/tags &> /dev/null; then
    echo "🚀 Đang khởi động Ollama server..."
    ollama serve &
    sleep 3
fi

echo "✅ Ollama server đang chạy"

# Kiểm tra xem model deepseek-r1:1.5b có sẵn không
if ! ollama list | grep -q "deepseek-r1:1.5b"; then
    echo "📥 Đang tải model deepseek-r1:1.5b..."
    ollama pull deepseek-r1:1.5b
fi

echo "✅ Model deepseek-r1:1.5b đã sẵn sàng"
echo "🌟 Sẵn sàng chạy simulation!"
echo ""
echo "Chạy lệnh sau để bắt đầu:"
echo "bun run dev"
