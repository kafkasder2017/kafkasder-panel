-- Insert countries
INSERT INTO public.countries (name, code, phone_code) VALUES
('Türkiye', 'TR', '+90'),
('Amerika Birleşik Devletleri', 'US', '+1'),
('Almanya', 'DE', '+49'),
('İngiltere', 'GB', '+44'),
('Fransa', 'FR', '+33'),
('Rusya', 'RU', '+7'),
('Gürcistan', 'GE', '+995'),
('Azerbaycan', 'AZ', '+994'),
('Ermenistan', 'AM', '+374'),
('Kazakistan', 'KZ', '+7'),
('Kırgızistan', 'KG', '+996'),
('Özbekistan', 'UZ', '+998'),
('Türkmenistan', 'TM', '+993'),
('Tacikistan', 'TJ', '+992');

-- Insert Turkish cities (major ones)
INSERT INTO public.cities (country_id, name) 
SELECT c.id, city_name
FROM (SELECT id FROM public.countries WHERE code = 'TR') c
CROSS JOIN (
    VALUES 
    ('İstanbul'),
    ('Ankara'),
    ('İzmir'),
    ('Bursa'),
    ('Antalya'),
    ('Adana'),
    ('Konya'),
    ('Gaziantep'),
    ('Mersin'),
    ('Diyarbakır'),
    ('Kayseri'),
    ('Eskişehir'),
    ('Urfa'),
    ('Malatya'),
    ('Erzurum'),
    ('Van'),
    ('Batman'),
    ('Elazığ'),
    ('Samsun'),
    ('Denizli'),
    ('Sakarya'),
    ('Kocaeli'),
    ('Trabzon'),
    ('Kahramanmaraş'),
    ('Manisa')
) AS city_list(city_name);

-- Insert some districts for Istanbul
INSERT INTO public.districts (city_id, name)
SELECT c.id, district_name
FROM (SELECT id FROM public.cities WHERE name = 'İstanbul') c
CROSS JOIN (
    VALUES 
    ('Fatih'),
    ('Beyoğlu'),
    ('Beşiktaş'),
    ('Şişli'),
    ('Kadıköy'),
    ('Üsküdar'),
    ('Bakırköy'),
    ('Zeytinburnu'),
    ('Bahçelievler'),
    ('Bağcılar'),
    ('Güngören'),
    ('Esenler'),
    ('Gaziosmanpaşa'),
    ('Sultangazi'),
    ('Arnavutköy'),
    ('Başakşehir'),
    ('Beylikdüzü'),
    ('Büyükçekmece'),
    ('Çatalca'),
    ('Silivri'),
    ('Pendik'),
    ('Tuzla'),
    ('Kartal'),
    ('Maltepe'),
    ('Ataşehir'),
    ('Ümraniye'),
    ('Sancaktepe'),
    ('Çekmeköy'),
    ('Beykoz'),
    ('Şile')
) AS district_list(district_name);

-- Insert some districts for Ankara
INSERT INTO public.districts (city_id, name)
SELECT c.id, district_name
FROM (SELECT id FROM public.cities WHERE name = 'Ankara') c
CROSS JOIN (
    VALUES 
    ('Çankaya'),
    ('Keçiören'),
    ('Yenimahalle'),
    ('Mamak'),
    ('Sincan'),
    ('Etimesgut'),
    ('Altındağ'),
    ('Pursaklar'),
    ('Gölbaşı'),
    ('Polatlı'),
    ('Elmadağ'),
    ('Kızılcahamam'),
    ('Şereflikoçhisar'),
    ('Haymana'),
    ('Kalecik'),
    ('Çubuk'),
    ('Ayaş'),
    ('Güdül'),
    ('Beypazarı'),
    ('Nallıhan'),
    ('Kazan'),
    ('Bala'),
    ('Evren'),
    ('Çamlıdere'),
    ('Akyurt')
) AS district_list(district_name);

-- Insert some sample neighborhoods for Fatih district
INSERT INTO public.neighborhoods (district_id, name)
SELECT d.id, neighborhood_name
FROM (SELECT id FROM public.districts WHERE name = 'Fatih') d
CROSS JOIN (
    VALUES 
    ('Sultanahmet'),
    ('Eminönü'),
    ('Beyazıt'),
    ('Vezneciler'),
    ('Zeyrek'),
    ('Balat'),
    ('Fener'),
    ('Ayvansaray'),
    ('Karagümrük'),
    ('Cerrahpaşa'),
    ('Aksaray'),
    ('Laleli'),
    ('Kumkapı'),
    ('Cankurtaran'),
    ('Alemdar'),
    ('Mollafenari'),
    ('Küçük Ayasofya'),
    ('Binbirdirek'),
    ('Hobyar'),
    ('Mercan')
) AS neighborhood_list(neighborhood_name);

-- Insert some sample neighborhoods for Beyoğlu district
INSERT INTO public.neighborhoods (district_id, name)
SELECT d.id, neighborhood_name
FROM (SELECT id FROM public.districts WHERE name = 'Beyoğlu') d
CROSS JOIN (
    VALUES 
    ('Taksim'),
    ('Galata'),
    ('Karaköy'),
    ('Cihangir'),
    ('Galatasaray'),
    ('Tünel'),
    ('Kasımpaşa'),
    ('Hasköy'),
    ('Kuledibi'),
    ('Piyalepaşa'),
    ('Sütlüce'),
    ('Halıcıoğlu'),
    ('Kemeralti'),
    ('Örnektepe'),
    ('Büyükdere'),
    ('Tarlabaşı'),
    ('Asmalımescit'),
    ('Kulaksız'),
    ('Kaptanpaşa'),
    ('Yahya Kahya')
) AS neighborhood_list(neighborhood_name); 