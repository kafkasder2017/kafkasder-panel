function a(t){if(!t)return"";const n=(t.first_name??t.ad??"").toString(),r=(t.last_name??t.soyad??"").toString();return`${n} ${r}`.trim()||(t.adSoyad??"").toString()}export{a as g};
