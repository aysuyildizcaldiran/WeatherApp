# 🌤 Weather App

Bu proje, kullanıcıya farklı şehirlerdeki hava durumu bilgilerini sunan bir **React Native** uygulamasıdır. Veriler **WeatherAPI** kullanılarak çekilmiştir. Uygulama, kullanıcı deneyimini geliştirmek için **Redux Toolkit**, **Axios** ve çeşitli React hook yapılarıyla TypeScript kullanılarak geliştirilmiştir.

## 📸 Ekran Görüntüleri
<img src="https://github.com/user-attachments/assets/df29eb95-8ff5-4dc4-a257-a19271c9552c" alt="Simulator Screenshot - iPhone 15 Pro - 2024-07-20 at 18 38 41" width="200"/>
<img src="https://github.com/user-attachments/assets/24e76472-c71f-4afd-9682-8d70b1c15d86" alt="Simulator Screenshot - iPhone 15 Pro - 2024-07-20 at 18 38 41" width="200"/>

<img src="https://github.com/user-attachments/assets/d5d529f2-69ed-4c92-8266-64ffaf754ac8" alt="Simulator Screenshot - iPhone 15 Pro - 2024-07-20 at 18 38 41" width="200"/>
<img src="https://github.com/user-attachments/assets/aa887cf9-fb26-42da-af57-6ed4937414b9" alt="Simulator Screenshot - iPhone 15 Pro - 2024-07-20 at 18 38 41" width="200"/>

## 🚀 Özellikler

- **Güncel Hava Durumu**: Seçili şehirlerin anlık hava durumu gösterilir.
- **Diğer Şehirlerin Hava Durumu**: Farklı şehirlerin hava durumu kartlarla gösterilir.
- **Günlük Tahminler**: Günlük sıcaklık ve hava durumu bilgisi ikonlarla kullanıcıya sunulur.
- **Kullanıcı Deneyimi**: Dinamik olarak değişen şehir bilgileri ve hoş bir arayüz.

## 🛠 Kullanılan Teknolojiler

- **React Native**: Mobil uygulama geliştirme.
- **TypeScript**: Güvenli ve okunabilir kod için.
- **Redux Toolkit**: Global state yönetimi için.
- **Axios**: API isteklerini yönetmek için.
- **React Hooks (useCallback, useEffect, useState)**: Fonksiyonel bileşenlerde durumu yönetmek için.
  
## 📍 Konumdan Şehir Bilgisi Alma

Uygulama, kullanıcının konum bilgilerini alarak otomatik olarak şehir bilgisi doğrulaması yapar. Bu işlem için **react-native-get-location** ve **Google Maps API** kullanılmaktadır.

## 📦 Kurulum

Projeyi yerel ortamınıza kurmak için aşağıdaki adımları takip edebilirsiniz:

1. Bu projeyi klonlayın:
    ```bash
    git clone https://github.com/aysuyildizcaldiran/WeatherApp.git
    cd WeatherApp
    ```

2. Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install

3. **WeatherAPI** anahtarınızı alın ve `theme` dosyanıza ekleyin:
    ```plaintext
    WEATHER_API_KEY=your_api_key_here
    ```
4. **GoogleMapsApı** anahtarınızı alın ve `theme` dosyanıza ekleyin:
    ```plaintext
    YOUR_GOOGLE_MAPS_API_KEY=your_api_key_here
    ```

5. Uygulamayı başlatın:
    ```bash
    npm run start
    # veya
    yarn start
    ```

## 📂 Proje Yapısı

    .
    ├── src
    │   ├── assets              # img yapıları
    │   ├── components          # Bileşenler
    │   ├── pages               # Ekranlar
    │   ├── redux               # Redux Toolkit yapılandırmaları
    └── App.tsx                 # Ana uygulama dosyası
    └── README.md
