import React from 'react';
import { z } from 'zod';
import { MultiStepForm, InputField, TextareaField } from './form-components';
import { useFormContext } from 'react-hook-form';

// Çok adımlı formun tüm alanlarını kapsayan Zod şeması
const PersonMultiStepSchema = z.object({
  // --- Genel Bilgiler ---
  firstName: z.string().min(2, 'Ad zorunlu'),
  lastName: z.string().min(2, 'Soyad zorunlu'),
  nationality: z.string().optional(),
  identityNumber: z.string().optional(),
  birthDate: z.string().optional(),
  mobilePhone: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Geçersiz e-posta').optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  category: z.string().optional(),
  fileNumber: z.string().optional(),
  sponsorshipType: z.string().optional(),
  recordStatus: z.string().optional(),
  // --- Kimlik Bilgileri ---
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  idType: z.string().optional(),
  idIssuer: z.string().optional(),
  idSerial: z.string().optional(),
  prevIds: z.string().optional(),
  prevResidences: z.string().optional(),
  // --- Pasaport ve Vize ---
  passportType: z.string().optional(),
  passportNumber: z.string().optional(),
  passportValidUntil: z.string().optional(),
  visaStart: z.string().optional(),
  visaEnd: z.string().optional(),
  returnDoc: z.string().optional(),
  // --- Kişisel Veriler ---
  gender: z.string().optional(),
  birthPlace: z.string().optional(),
  maritalStatus: z.string().optional(),
  education: z.string().optional(),
  employmentStatus: z.string().optional(),
  sector: z.string().optional(),
  professionGroup: z.string().optional(),
  professionDesc: z.string().optional(),
  criminalRecord: z.string().optional(),
  // --- İş ve Gelir Durumu ---
  residenceType: z.string().optional(),
  monthlyIncome: z.string().optional(),
  monthlyExpense: z.string().optional(),
  socialSecurity: z.string().optional(),
  incomeSources: z.string().optional(),
  // --- Sağlık Durumu ---
  bloodType: z.string().optional(),
  smoking: z.string().optional(),
  disability: z.string().optional(),
  prosthetics: z.string().optional(),
  medicalDevices: z.string().optional(),
  medications: z.string().optional(),
  surgeries: z.string().optional(),
  diseases: z.string().optional(),
  healthNote: z.string().optional(),
  // --- Acil Durum İletişim ---
  emergencyName: z.string().optional(),
  emergencyRelation: z.string().optional(),
  emergencyPhone1: z.string().optional(),
  emergencyPhone2: z.string().optional(),
  // --- Etiketler ---
  regularAid: z.boolean().optional(),
  rejectFuture: z.boolean().optional(),
  negative: z.boolean().optional(),
  fakeDoc: z.boolean().optional(),
  // --- Özel Durumlar ---
  earthquakeVictim: z.boolean().optional(),
  // --- Kayıt Bilgisi ---
  createdAt: z.string().optional(),
  createdBy: z.string().optional(),
  createdIp: z.string().optional(),
  // --- İlave Açıklamalar ---
  noteTr: z.string().optional(),
  noteEn: z.string().optional(),
  noteAr: z.string().optional(),
});

type PersonMultiStepFormData = z.infer<typeof PersonMultiStepSchema>;

function GenelBilgilerStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="firstName" label="Ad" />
      <InputField control={control} name="lastName" label="Soyad" />
      <InputField control={control} name="nationality" label="Uyruk" />
      <InputField control={control} name="identityNumber" label="Kimlik No" />
      <InputField control={control} name="birthDate" label="Doğum Tarihi" type="date" />
      <InputField control={control} name="mobilePhone" label="Cep Telefonu" />
      <InputField control={control} name="phone" label="Sabit Telefon" />
      <InputField control={control} name="email" label="E-posta" type="email" />
      <InputField control={control} name="country" label="Ülke" />
      <InputField control={control} name="city" label="Şehir/Bölge" />
      <InputField control={control} name="district" label="Mahalle/Köy" />
      <InputField control={control} name="address" label="Adres" />
      <InputField control={control} name="category" label="Kategori" />
      <InputField control={control} name="fileNumber" label="Dosya Numarası" />
      <InputField control={control} name="sponsorshipType" label="Sponsorluk Tipi" />
      <InputField control={control} name="recordStatus" label="Kayıt Durumu" />
    </>
  );
}

function KimlikBilgileriStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="fatherName" label="Baba Adı" />
      <InputField control={control} name="motherName" label="Ana Adı" />
      <InputField control={control} name="idType" label="Kimlik Türü" />
      <InputField control={control} name="idIssuer" label="Geçerlilik/Veren Kurum" />
      <InputField control={control} name="idSerial" label="Seri Numarası" />
      <InputField control={control} name="prevIds" label="Önceki Kimlik(ler)" />
      <InputField control={control} name="prevResidences" label="Önceki İkamet(ler)" />
    </>
  );
}

function PasaportVizeStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="passportType" label="Pasaport Türü" />
      <InputField control={control} name="passportNumber" label="Pasaport No" />
      <InputField control={control} name="passportValidUntil" label="Pasaport Geçerlilik Tarihi" type="date" />
      <InputField control={control} name="visaStart" label="Vize Başlangıç" type="date" />
      <InputField control={control} name="visaEnd" label="Vize Bitiş" type="date" />
      <InputField control={control} name="returnDoc" label="Geri Dönüş Belgesi" />
    </>
  );
}

function KisiselVerilerStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="gender" label="Cinsiyet" />
      <InputField control={control} name="birthPlace" label="Doğum Yeri" />
      <InputField control={control} name="maritalStatus" label="Medeni Durum" />
      <InputField control={control} name="education" label="Eğitim" />
      <InputField control={control} name="employmentStatus" label="İş Durumu" />
      <InputField control={control} name="sector" label="Çalıştığı Sektör" />
      <InputField control={control} name="professionGroup" label="Meslek Grubu" />
      <InputField control={control} name="professionDesc" label="Meslek Açıklaması" />
      <InputField control={control} name="criminalRecord" label="Adli Sicil Kaydı" />
    </>
  );
}

function IsGelirStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="residenceType" label="Yaşadığı Yer (Kira/Sahip/Diğer)" />
      <InputField control={control} name="monthlyIncome" label="Aylık Gelir" />
      <InputField control={control} name="monthlyExpense" label="Aylık Gider" />
      <InputField control={control} name="socialSecurity" label="Sosyal Güvence" />
      <InputField control={control} name="incomeSources" label="Gelir Kaynakları" />
    </>
  );
}

function SaglikStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="bloodType" label="Kan Grubu" />
      <InputField control={control} name="smoking" label="Sigara Kullanımı" />
      <InputField control={control} name="disability" label="Engellilik (detaylı)" />
      <InputField control={control} name="prosthetics" label="Kullanılan Protezler" />
      <InputField control={control} name="medicalDevices" label="Tıbbi Cihazlar" />
      <InputField control={control} name="medications" label="Kullanılan İlaçlar" />
      <InputField control={control} name="surgeries" label="Ameliyatlar" />
      <InputField control={control} name="diseases" label="Hastalıklar" />
      <TextareaField control={control} name="healthNote" label="Açıklama" />
    </>
  );
}

function AcilDurumStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="emergencyName" label="Ad" />
      <InputField control={control} name="emergencyRelation" label="Yakınlık" />
      <InputField control={control} name="emergencyPhone1" label="Telefon 1" />
      <InputField control={control} name="emergencyPhone2" label="Telefon 2" />
    </>
  );
}

function EtiketlerStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="regularAid" label="Düzenli Yardım Yapılabilir" type="checkbox" />
      <InputField control={control} name="rejectFuture" label="Gelecek Başvuruları Reddedilmeli" type="checkbox" />
      <InputField control={control} name="negative" label="Olumsuz" type="checkbox" />
      <InputField control={control} name="fakeDoc" label="Sahte Evrak/Yalan Beyan" type="checkbox" />
    </>
  );
}

function OzelDurumStep() {
  const { control } = useFormContext();
  return (
    <InputField control={control} name="earthquakeVictim" label="Depremzede" type="checkbox" />
  );
}

function KayitBilgisiStep() {
  const { control } = useFormContext();
  return (
    <>
      <InputField control={control} name="createdAt" label="Kayıt Zamanı" type="date" />
      <InputField control={control} name="createdBy" label="Kayıt Eden" />
      <InputField control={control} name="createdIp" label="Kayıt IP" />
    </>
  );
}

function IlaveAciklamaStep() {
  const { control } = useFormContext();
  return (
    <>
      <TextareaField control={control} name="noteTr" label="Açıklama (TR)" />
      <TextareaField control={control} name="noteEn" label="Açıklama (EN)" />
      <TextareaField control={control} name="noteAr" label="Açıklama (AR)" />
    </>
  );
}

export function PersonMultiStepForm({ onComplete, defaultValues }: {
  onComplete: (data: PersonMultiStepFormData) => void;
  defaultValues?: Partial<PersonMultiStepFormData>;
}) {
  const steps = [
    { title: 'Genel Bilgiler', component: GenelBilgilerStep },
    { title: 'Kimlik Bilgileri', component: KimlikBilgileriStep },
    { title: 'Pasaport ve Vize', component: PasaportVizeStep },
    { title: 'Kişisel Veriler', component: KisiselVerilerStep },
    { title: 'İş ve Gelir Durumu', component: IsGelirStep },
    { title: 'Sağlık Durumu', component: SaglikStep },
    { title: 'Acil Durum İletişim', component: AcilDurumStep },
    { title: 'Etiketler', component: EtiketlerStep },
    { title: 'Özel Durumlar', component: OzelDurumStep },
    { title: 'Kayıt Bilgisi', component: KayitBilgisiStep },
    { title: 'İlave Açıklamalar', component: IlaveAciklamaStep },
  ];
  return (
    <MultiStepForm
      steps={steps}
      onComplete={onComplete}
      schema={PersonMultiStepSchema}
    />
  );
} 