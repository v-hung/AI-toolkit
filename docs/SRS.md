# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

## Hệ thống Quản lý Đơn hàng & Vận chuyển

---

## 1. Tổng quan

### 1.1 Mục tiêu

Xây dựng hệ thống web giúp:

- Quản lý khách hàng
- Quản lý đơn hàng từ Trung Quốc về Việt Nam
- Theo dõi trạng thái vận chuyển
- Quản lý trạng thái hàng hóa (thay cho kho vật lý)
- Thống kê và báo cáo

---

### 1.2 Phạm vi hệ thống

Hệ thống hỗ trợ:

- Tạo đơn và tích hợp API với các đơn vị vận chuyển tại Việt Nam
- Theo dõi trạng thái đơn hàng
- Quản lý trạng thái hàng hóa trong quá trình vận chuyển

Không bao gồm:

- Quản lý vận chuyển từ Trung Quốc về Việt Nam (do đối tác thực hiện)
- Quản lý kho vật lý tại Việt Nam

---

### 1.3 Đối tượng sử dụng

| Vai trò                | Mô tả                        |
| ---------------------- | ---------------------------- |
| Admin                  | Quản lý toàn bộ hệ thống     |
| Nhân viên              | Tạo và xử lý đơn hàng        |
| Đối tác kho (tuỳ chọn) | Cập nhật trạng thái hàng hóa |

---

## 2. Quy trình nghiệp vụ

### 2.1 Quy trình hiện tại

1. Tạo đơn trên hệ thống vận chuyển
2. In tem và dán lên hàng
3. Vận chuyển từ Trung Quốc về Việt Nam
4. Hàng về kho đối tác (quét mã)
5. Xuất kho
6. Giao cho đơn vị vận chuyển
7. Đơn vị vận chuyển giao hàng và thu COD (nếu có)

---

### 2.2 Quy trình hệ thống (sau khi xây dựng)

1. Tạo đơn trên hệ thống
2. Gọi API đơn vị vận chuyển để tạo vận đơn
3. In tem
4. Cập nhật trạng thái đơn:
   - Đang vận chuyển từ Trung Quốc
   - Đã về Việt Nam
   - Đã giao đơn vị vận chuyển
5. Theo dõi trạng thái giao hàng
6. Xem báo cáo và thống kê

---

## 3. Yêu cầu chức năng

---

### 3.1 Module quản lý khách hàng

- Thêm khách hàng
- Cập nhật thông tin khách hàng
- Xóa khách hàng
- Xem danh sách khách hàng
- Tìm kiếm khách hàng theo tên hoặc số điện thoại
- Import khách hàng từ file Excel

---

### 3.2 Module quản lý đơn hàng (trung tâm)

- Tạo đơn hàng
- Cập nhật đơn hàng
- Hủy đơn hàng
- Xem danh sách đơn hàng
- Tìm kiếm và lọc đơn hàng
- Gọi API để tạo vận chuyển đơn
- In tem vận chuyển đơn

---

### 3.3 Module quản lý trạng thái hàng hóa

- Theo dõi trạng thái đơn:
  - Đang vận chuyển từ Trung Quốc
  - Đã về Việt Nam
  - Đã xuất kho
- Xem danh sách đơn theo trạng thái
- Cập nhật trạng thái đơn hàng

---

### 3.4 Module tích hợp đơn vị vận chuyển

- Tích hợp API với:
  - GHN
  - J&T
  - Viettel Post
  - Best Express
- Theo dõi trạng thái đơn hàng
- Xem lịch sử vận chuyển

---

### 3.5 Module báo cáo & thống kê

- Thống kê số đơn theo:
  - Ngày
  - Tuần
  - Tháng
  - Năm
- Thống kê:
  - Đơn đang giao
  - Đơn đã giao
  - Đơn tồn
- Dashboard tổng quan

---

### 3.6 Module đa ngôn ngữ

- Hỗ trợ nhiều ngôn ngữ:
  - Tiếng Việt
  - Tiếng Trung (có thể mở rộng)
- Cho phép người dùng chuyển đổi ngôn ngữ
- Nội dung hỗ trợ đa ngôn ngữ:
  - Giao diện (UI)
  - Thông báo hệ thống

---

## 4. Quy tắc nghiệp vụ

- Mỗi đơn hàng phải có mã vận đơn
- Trạng thái đơn hàng theo luồng:
  - Tạo đơn → Đang vận chuyển → Về Việt Nam → Giao vận chuyển → Đang giao → Hoàn thành
- Không được chỉnh sửa đơn sau khi đã giao cho đơn vị vận chuyển
- COD là tùy chọn

---
