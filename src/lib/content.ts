/* Site content (EN / VI). Ported 1:1 from the original design. */

export const LOCALES = ["en", "vi"] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = "en";
export const isLang = (v: unknown): v is Lang => v === "en" || v === "vi";

export const IMG = {
  offshore: "/img/offshore.jpg",
  yard: "/img/yard.jpg",
  otsm1: "/img/otsm1.jpg",
  safhp: "/img/saf-haiphong.jpg",
  safqn: "/img/saf-quangngai.jpg",
  pipe: "/img/seawater-pipe.jpg",
  team: "/img/team.jpg",
  teamWide: "/img/team-wide.jpg",
} as const;

export const EMAIL = "vuongtru89@gmail.com";
export const PHONE = "+84 768 337 402";
export const WA = "https://wa.me/84768337402";
export const SITE_NAME = "MKP Technical Services";

type Pair = [string, string];

const C = {
    en: {
      nav: { services: 'Services', projects: 'Projects', about: 'About', contact: 'Contact', cta: 'Request personnel', home: 'Home', requests: 'Requests received' },
      rail: 'Contact us', more: 'read more', qual: 'Qualifications', std: 'Standards', scroll: 'scroll down',
      cta: { kicker: 'Next step', title: 'Need inspectors on your next project?', text: 'Tell us the scope, discipline and location. We confirm candidate availability and mobilization lead time for each assignment.' },
      footer: { tag: 'Certified inspection professionals for energy, industrial and infrastructure projects. Based in Hai Phong, Viet Nam.', company: 'Company', city: 'Hai Phong, Viet Nam', base: 'Inspection · Engineering · Manpower' },
      home: {
        kicker: 'Technical inspection services', title: 'You trust us. We deliver results.',
        ch1: { kicker: 'Services', title: 'Four inspection disciplines, one accountable partner', body: 'We source, screen and coordinate certified inspectors matched to your specifications, applicable codes and client competency requirements.' },
        ch2: { kicker: 'How we work', title: 'From your request to site mobilization', body: 'Every candidate is screened by our technical lead before you see a CV. Certificates are checked for validity, method and scope.',
          steps: [['Requirement', 'Scope, discipline, certificates, location'], ['Sourcing', 'Suitable candidates from our network'], ['Document check', 'CV, certificates, project history'], ['Technical review', 'Discipline competence and fit'], ['Client approval', 'Candidate dossier for your review'], ['Mobilization', 'Contract, travel, medical, onboarding']] },
        ch3: { kicker: 'Projects', title: 'Where our people have worked', body: 'Our inspectors have supported power, biorefinery, shipbuilding and offshore wind projects in Viet Nam, Malaysia and Taiwan.' }
      },
      servicesPage: { kicker: 'Services', title: 'Inspection disciplines we staff', lead: 'Certified welding, coating, NDT and E&I inspectors for energy, industrial and infrastructure projects, onshore and offshore.', certs: 'Team certifications', mech: 'Mechanical equipment inspection', mechText: 'Inspectors with hands-on experience on steam turbines, boiler feed water pumps and mechanical installation are also available.' },
      detail: { scopeKicker: 'Scope', scopeTitle: 'What our inspectors do on site', peopleKicker: 'Personnel', peopleTitle: 'Who we deploy', peopleBody: 'Each candidate is matched to your specification and screened by our technical lead. Certificates are checked for validity and scope before the dossier reaches you.', othersKicker: 'Other disciplines', othersTitle: 'One partner for the whole inspection scope', see: 'see the scope' },
      projects: { title: 'Where our people have worked', lead: 'Power plants, biorefinery modules, shipbuilding and offshore wind: a selection of projects our inspectors have supported.', refsKicker: 'References', refsTitle: 'Project references', th: ['Project / client', 'Discipline', 'Scope', 'Period'], ctaTitle: 'Your project could be the next one here' },
      about: { kicker: 'About MKP', title: 'A new name, backed by years of field experience', whoKicker: 'Who we are', whoTitle: 'Inspection people, not just a staffing desk',
        p1: 'MKP Technical Services sources, screens and coordinates qualified inspection professionals for fabrication, construction, installation, testing and commissioning.',
        p2: 'Our people have worked on steam turbines, boiler feed water pumps, module fabrication, oil and gas, offshore and industrial construction. We believe professional value shows in practical expertise, technical judgment and commitment, not only in certificates.',
        mission: ['Mission', 'Connect clients with competent technical professionals who support quality, safety and schedule.'],
        vision: ['Vision', 'Become a trusted manpower and inspection partner for industrial and energy projects in Viet Nam and abroad.'],
        certsKicker: 'Certifications', certsTitle: 'Held by our core team', certsBody: 'Every certificate is checked for validity, method and scope before a candidate is submitted.',
        certs: [['NDT Level III', 'ASNT (USA) · AINDT (Australia) · BV Italy'], ['NDT Level 2', 'ISO 9712 · ASNT SNT-TC-1A'], ['Welding & Senior Welding Inspector', 'CSWIP 3.1 · 3.2.2 (TWI)'], ['Surface Treatment Inspector Level III', 'FROSIO'], ['Coating Inspector', 'NACE / AMPP']],
        teamKicker: 'Core team', teamTitle: 'A lean team behind every mobilization',
        roles: [['Managing Director', 'Business leadership, client relationships and commercial oversight.'], ['Technical / QA-QC Lead', 'Technical screening, discipline matching and quality coordination.'], ['Manpower Coordinator', 'Sourcing, availability, documentation and mobilization.'], ['HSE / Admin Support', 'Training records, site requirements and personnel administration.']],
        whyKicker: 'Why MKP', whyTitle: 'Why clients work with us',
        why: [['Qualified professionals', 'Credentials and experience reviewed before submission.'], ['Flexible arrangements', 'Project-based, short-term, long-term and shutdown support.'], ['Responsive coordination', 'Clear communication from requirement to mobilization.'], ['Discipline coverage', 'Welding, coating, NDT and E&I inspection personnel.'], ['Onshore and offshore', 'Mobilization subject to medical, training and access requirements.'], ['Transparent delivery', 'Clear commercial terms, documentation and assignment coordination.']],
        ctaKicker: 'Work with us', ctaTitle: 'Talk to the people who will be on your site' },
      contact: { title: 'Tell us who you need on site', lead: 'Share the scope, discipline and location. We reply with available candidates and a realistic mobilization date.', phone: 'Phone / WhatsApp', office: 'Office', copy: 'Copy', copied: 'Copied',
        nextKicker: 'What happens next', next: [['We review your requirement', 'Our technical lead checks the scope, codes and certificates you need.'], ['You receive candidate dossiers', 'CVs and certificates of screened candidates, ready for your approval.'], ['We mobilize', 'Contract, travel, medical and site onboarding are coordinated for you.']],
        formTitle: 'Request personnel', formSub: 'The more detail you share, the faster we can match the right people.',
        name: 'Full name', company: 'Company', phoneF: 'Phone / WhatsApp', discipline: 'Discipline', choose: 'Select a discipline', other: 'Other', mech: 'Mechanical equipment inspection',
        headcount: 'Number of personnel', location: 'Project location', locationHint: 'City, country or offshore field', start: 'Expected start', startHint: 'e.g. early January 2027',
        message: 'Your requirement', messageHint: 'Certificates required, duration, shift pattern, onshore or offshore…', required: 'Required fields', submit: 'Send request', sending: 'Sending…',
        missing: 'Fill in the fields marked with * to send your request.', badEmail: 'Enter a valid email address, for example name@company.com.',
        failed: `Your request could not be sent. Please email it to ${EMAIL} instead.`,
        thanksTitle: 'Thank you, your request is in', thanksText: 'Our team will review it and contact you by email or phone.', again: 'Send another request' },
      requests: { kicker: 'Editors only', title: 'Requests received', empty: 'No requests yet. Requests sent from the Contact page appear here as they arrive.', noAccess: 'Only editors of this site can see received requests.', markDone: 'Mark handled', markNew: 'Mark as new', st: { new: 'New', done: 'Handled' }, headcount: 'personnel', start: 'start' },
      notFound: 'This page does not exist. Go back to the home page.'
    },
    vi: {
      nav: { services: 'Dịch vụ', projects: 'Dự án', about: 'Về chúng tôi', contact: 'Liên hệ', cta: 'Yêu cầu nhân sự', home: 'Trang chủ', requests: 'Yêu cầu đã nhận' },
      rail: 'Liên hệ', more: 'xem thêm', qual: 'Chứng chỉ', std: 'Tiêu chuẩn', scroll: 'cuộn xuống',
      cta: { kicker: 'Bước tiếp theo', title: 'Cần nhân sự giám sát cho dự án tiếp theo?', text: 'Gửi cho chúng tôi phạm vi, chuyên ngành và địa điểm. Chúng tôi xác nhận ứng viên sẵn sàng và thời gian huy động cho từng vị trí.' },
      footer: { tag: 'Chuyên gia giám sát có chứng chỉ cho các dự án năng lượng, công nghiệp và hạ tầng. Trụ sở tại Hải Phòng, Việt Nam.', company: 'Công ty', city: 'Hải Phòng, Việt Nam', base: 'Giám sát · Kỹ thuật · Nhân lực' },
      home: {
        kicker: 'Dịch vụ giám sát kỹ thuật', title: 'Bạn tin tưởng. Chúng tôi mang lại kết quả.',
        ch1: { kicker: 'Dịch vụ', title: 'Bốn chuyên ngành giám sát, một đối tác chịu trách nhiệm', body: 'Chúng tôi tìm kiếm, sàng lọc và điều phối giám sát viên có chứng chỉ, phù hợp đặc tính kỹ thuật, tiêu chuẩn áp dụng và yêu cầu năng lực của khách hàng.' },
        ch2: { kicker: 'Cách chúng tôi làm việc', title: 'Từ yêu cầu của bạn đến khi nhân sự có mặt', body: 'Mọi ứng viên đều được trưởng nhóm kỹ thuật sàng lọc trước khi bạn nhận CV. Chứng chỉ được kiểm tra hiệu lực, phương pháp và phạm vi.',
          steps: [['Tiếp nhận yêu cầu', 'Phạm vi, chuyên ngành, chứng chỉ, địa điểm'], ['Tìm ứng viên', 'Từ mạng lưới chuyên gia của chúng tôi'], ['Kiểm tra hồ sơ', 'CV, chứng chỉ, kinh nghiệm dự án'], ['Đánh giá kỹ thuật', 'Năng lực chuyên ngành và mức phù hợp'], ['Khách hàng duyệt', 'Gửi hồ sơ ứng viên để bạn xem xét'], ['Huy động', 'Hợp đồng, di chuyển, sức khỏe, nhập môn']] },
        ch3: { kicker: 'Dự án', title: 'Nơi đội ngũ của chúng tôi đã làm việc', body: 'Giám sát viên của chúng tôi đã tham gia các dự án điện, nhà máy lọc sinh học, đóng tàu và điện gió ngoài khơi tại Việt Nam, Malaysia và Đài Loan.' }
      },
      servicesPage: { kicker: 'Dịch vụ', title: 'Các chuyên ngành giám sát chúng tôi cung ứng', lead: 'Giám sát hàn, sơn phủ, NDT và E&I có chứng chỉ quốc tế cho các dự án năng lượng, công nghiệp và hạ tầng, trên bờ lẫn ngoài khơi.', certs: 'Chứng chỉ đội ngũ', mech: 'Giám sát thiết bị cơ khí', mechText: 'Chúng tôi cũng cung ứng giám sát viên có kinh nghiệm thực tế về tuabin hơi, bơm cấp nước lò hơi và lắp đặt cơ khí.' },
      detail: { scopeKicker: 'Phạm vi', scopeTitle: 'Giám sát viên của chúng tôi làm gì tại công trường', peopleKicker: 'Nhân sự', peopleTitle: 'Chúng tôi cung ứng những ai', peopleBody: 'Mỗi ứng viên được chọn theo đặc tính kỹ thuật của bạn và được trưởng nhóm kỹ thuật sàng lọc. Chứng chỉ được kiểm tra hiệu lực và phạm vi trước khi hồ sơ đến tay bạn.', othersKicker: 'Chuyên ngành khác', othersTitle: 'Một đối tác cho toàn bộ phạm vi giám sát', see: 'xem phạm vi công việc' },
      projects: { title: 'Nơi đội ngũ của chúng tôi đã làm việc', lead: 'Nhà máy điện, module nhà máy lọc sinh học, đóng tàu và điện gió ngoài khơi: một số dự án giám sát viên của chúng tôi đã tham gia.', refsKicker: 'Tham chiếu', refsTitle: 'Dự án tham chiếu', th: ['Dự án / khách hàng', 'Chuyên ngành', 'Phạm vi', 'Thời gian'], ctaTitle: 'Dự án của bạn có thể là dự án tiếp theo ở đây' },
      about: { kicker: 'Về MKP', title: 'Tên tuổi mới, kinh nghiệm thực địa nhiều năm', whoKicker: 'Chúng tôi là ai', whoTitle: 'Người làm giám sát, không chỉ là bàn cung ứng nhân sự',
        p1: 'MKP Technical Services tìm kiếm, sàng lọc và điều phối chuyên gia giám sát đủ năng lực cho các giai đoạn chế tạo, thi công, lắp đặt, thử nghiệm và chạy thử.',
        p2: 'Đội ngũ của chúng tôi đã làm việc với tuabin hơi, bơm cấp nước lò hơi, chế tạo module, dầu khí, ngoài khơi và xây dựng công nghiệp. Chúng tôi tin rằng giá trị chuyên môn thể hiện ở kinh nghiệm thực tế, khả năng đánh giá kỹ thuật và sự tận tâm, không chỉ ở chứng chỉ.',
        mission: ['Sứ mệnh', 'Kết nối khách hàng với chuyên gia kỹ thuật có năng lực, góp phần đạt mục tiêu chất lượng, an toàn và tiến độ.'],
        vision: ['Tầm nhìn', 'Trở thành đối tác cung ứng nhân lực và giám sát đáng tin cậy cho các dự án công nghiệp, năng lượng tại Việt Nam và quốc tế.'],
        certsKicker: 'Chứng chỉ', certsTitle: 'Đội ngũ nòng cốt đang nắm giữ', certsBody: 'Mọi chứng chỉ đều được kiểm tra hiệu lực, phương pháp và phạm vi trước khi đề xuất ứng viên.',
        certs: [['NDT bậc III', 'ASNT (Mỹ) · AINDT (Úc) · BV Ý'], ['NDT bậc 2', 'ISO 9712 · ASNT SNT-TC-1A'], ['Giám sát hàn & giám sát hàn cao cấp', 'CSWIP 3.1 · 3.2.2 (TWI)'], ['Giám sát xử lý bề mặt bậc III', 'FROSIO'], ['Giám sát sơn phủ', 'NACE / AMPP']],
        teamKicker: 'Đội ngũ nòng cốt', teamTitle: 'Đội ngũ tinh gọn đứng sau mỗi lần huy động',
        roles: [['Giám đốc điều hành', 'Điều hành kinh doanh, quan hệ khách hàng và thương mại.'], ['Trưởng nhóm kỹ thuật / QA-QC', 'Sàng lọc kỹ thuật, ghép đúng chuyên ngành và điều phối chất lượng.'], ['Điều phối nhân sự', 'Tìm nguồn, xác nhận lịch, hồ sơ và huy động.'], ['HSE / Hành chính', 'Hồ sơ đào tạo, yêu cầu công trường và quản lý nhân sự.']],
        whyKicker: 'Vì sao chọn MKP', whyTitle: 'Vì sao khách hàng làm việc với chúng tôi',
        why: [['Chuyên gia đủ năng lực', 'Chứng chỉ và kinh nghiệm được xem xét trước khi đề xuất.'], ['Hình thức linh hoạt', 'Theo dự án, ngắn hạn, dài hạn và đợt bảo dưỡng.'], ['Điều phối nhanh', 'Trao đổi rõ ràng từ khi nhận yêu cầu đến khi huy động.'], ['Đủ chuyên ngành', 'Nhân sự giám sát hàn, sơn phủ, NDT và E&I.'], ['Trên bờ và ngoài khơi', 'Huy động theo yêu cầu sức khỏe, đào tạo và ra vào công trường.'], ['Minh bạch', 'Điều khoản thương mại, hồ sơ và điều phối công việc rõ ràng.']],
        ctaKicker: 'Hợp tác cùng chúng tôi', ctaTitle: 'Trao đổi trực tiếp với những người sẽ có mặt tại công trường của bạn' },
      contact: { title: 'Cho chúng tôi biết bạn cần nhân sự nào', lead: 'Gửi phạm vi, chuyên ngành và địa điểm. Chúng tôi phản hồi với ứng viên sẵn sàng và ngày huy động thực tế.', phone: 'Điện thoại / WhatsApp', office: 'Văn phòng', copy: 'Sao chép', copied: 'Đã chép',
        nextKicker: 'Các bước tiếp theo', next: [['Chúng tôi xem xét yêu cầu', 'Trưởng nhóm kỹ thuật kiểm tra phạm vi, tiêu chuẩn và chứng chỉ bạn cần.'], ['Bạn nhận hồ sơ ứng viên', 'CV và chứng chỉ của ứng viên đã sàng lọc, sẵn sàng để bạn duyệt.'], ['Chúng tôi huy động', 'Hợp đồng, di chuyển, khám sức khỏe và nhập môn công trường được điều phối giúp bạn.']],
        formTitle: 'Yêu cầu nhân sự', formSub: 'Thông tin càng chi tiết, chúng tôi càng nhanh tìm đúng người.',
        name: 'Họ và tên', company: 'Công ty', phoneF: 'Điện thoại / WhatsApp', discipline: 'Chuyên ngành', choose: 'Chọn chuyên ngành', other: 'Khác', mech: 'Giám sát thiết bị cơ khí',
        headcount: 'Số lượng nhân sự', location: 'Địa điểm dự án', locationHint: 'Thành phố, quốc gia hoặc mỏ ngoài khơi', start: 'Thời gian bắt đầu dự kiến', startHint: 'vd. đầu tháng 1/2027',
        message: 'Nhu cầu của bạn', messageHint: 'Chứng chỉ yêu cầu, thời hạn, ca làm việc, trên bờ hay ngoài khơi…', required: 'Thông tin bắt buộc', submit: 'Gửi yêu cầu', sending: 'Đang gửi…',
        missing: 'Vui lòng điền các ô có dấu * để gửi yêu cầu.', badEmail: 'Email chưa đúng định dạng, ví dụ ten@congty.com.',
        failed: `Không gửi được yêu cầu. Vui lòng gửi email tới ${EMAIL}.`,
        thanksTitle: 'Cảm ơn bạn, chúng tôi đã nhận yêu cầu', thanksText: 'Đội ngũ MKP sẽ xem xét và liên hệ lại qua email hoặc điện thoại.', again: 'Gửi yêu cầu khác' },
      requests: { kicker: 'Chỉ dành cho quản trị', title: 'Yêu cầu đã nhận', empty: 'Chưa có yêu cầu nào. Yêu cầu gửi từ trang Liên hệ sẽ hiện ở đây ngay khi đến.', noAccess: 'Chỉ người quản trị trang mới xem được các yêu cầu đã nhận.', markDone: 'Đánh dấu đã xử lý', markNew: 'Đánh dấu là mới', st: { new: 'Mới', done: 'Đã xử lý' }, headcount: 'nhân sự', start: 'bắt đầu' },
      notFound: 'Trang này không tồn tại. Quay lại trang chủ.'
    }
};

export type Dict = (typeof C)["en"];
export const DICT: Record<Lang, Dict> = C;
export const t = (lang: Lang): Dict => C[lang];

export interface ServiceText {
  name: string;
  title: string;
  lead: string;
  note: string;
  alt: string;
  qualsT?: string;
  stdsT?: string;
  ticks: string[];
  tasks: Pair[];
  roles: string[];
}
export interface Service {
  slug: string;
  img: string;
  quals: string;
  stds: string;
  en: ServiceText;
  vi: ServiceText;
}

export const SERVICES: Service[] = [
    { slug: 'welding', img: IMG.otsm1, quals: 'CSWIP 3.1 / 3.2 · AWS CWI', stds: 'ASME IX · ASME B31.3 · ASME VIII · AWS D1.1 · ISO 15614',
      en: { name: 'Welding inspection', title: 'Every weld traced, from WPS to final dossier', lead: 'Welding inspectors, senior welding inspectors and piping QA/QC for fabrication, installation and pressure testing.', note: 'CSWIP 3.1 / 3.2 · AWS CWI', alt: 'OTSM1 modules during load-out',
        ticks: ['WPS, PQR and WQTR review', 'Fit-up inspection and in-process welding surveillance', 'NDT, PWHT and pressure test coordination'],
        tasks: [['Procedure review', 'Review WPS, PQR and WQTR against project specifications and applicable codes.'], ['Material traceability', 'Verify consumables, material identification and heat number traceability.'], ['Fit-up and welding surveillance', 'Check joint preparation, fit-up and parameters while welding is in progress.'], ['NDT, PWHT and repairs', 'Coordinate testing, heat treatment and repair cycles with the NDT team.'], ['Pressure testing', 'Witness pressure tests and review test packages before sign-off.'], ['Records and handover', 'Review weld maps, punch items and final quality dossiers.']],
        roles: ['Welding inspector', 'Senior welding inspector', 'Piping inspector', 'Welding QA/QC engineer'] },
      vi: { name: 'Giám sát hàn', title: 'Mọi mối hàn được truy vết, từ WPS đến hồ sơ hoàn công', lead: 'Giám sát hàn, giám sát hàn cao cấp và QA/QC đường ống cho chế tạo, lắp đặt và thử áp lực.', note: 'CSWIP 3.1 / 3.2 · AWS CWI', alt: 'Các module OTSM1 khi xuất xưởng',
        ticks: ['Xem xét WPS, PQR và WQTR', 'Kiểm tra lắp ghép và giám sát quá trình hàn', 'Điều phối NDT, PWHT và thử áp lực'],
        tasks: [['Xem xét quy trình', 'Đối chiếu WPS, PQR và WQTR với đặc tính kỹ thuật dự án và tiêu chuẩn áp dụng.'], ['Truy xuất vật liệu', 'Kiểm tra vật liệu hàn, nhận dạng vật liệu và truy xuất số mẻ.'], ['Lắp ghép và giám sát hàn', 'Kiểm tra vát mép, lắp ghép và thông số trong quá trình hàn.'], ['NDT, PWHT và sửa chữa', 'Điều phối kiểm tra, xử lý nhiệt và sửa chữa cùng đội NDT.'], ['Thử áp lực', 'Chứng kiến thử áp lực và xem xét hồ sơ test package trước khi ký.'], ['Hồ sơ và bàn giao', 'Xem xét weld map, punch list và hồ sơ chất lượng hoàn công.']],
        roles: ['Giám sát hàn', 'Giám sát hàn cao cấp', 'Giám sát đường ống', 'Kỹ sư QA/QC hàn'] } },
    { slug: 'coating', img: IMG.pipe, quals: 'AMPP CIP · BGAS-CSWIP · FROSIO', stds: 'ISO 8501 / 8502 / 8503 · ISO 12944 · SSPC / AMPP',
      en: { name: 'Coating inspection', title: 'Surface prep and film build, checked at every hold point', lead: 'Coating, blasting and passive fire protection inspectors for shipyards, plants and offshore structures.', note: 'AMPP · BGAS-CSWIP · FROSIO', alt: 'Inspectors inside a seawater pipe',
        ticks: ['Temperature, relative humidity and dew point', 'Blast cleanliness, surface profile and contamination', 'WFT / DFT checks, holiday testing and PFP application'],
        tasks: [['Procedure review', 'Review coating procedures, paint data sheets and specifications.'], ['Ambient conditions', 'Check temperature, relative humidity and dew point before and during work.'], ['Surface preparation', 'Inspect blasting, surface cleanliness, profile and contamination.'], ['Application monitoring', 'Monitor mixing ratio, induction time and pot life.'], ['Film checks', 'Wet and dry film thickness checks and holiday testing.'], ['Repairs and PFP', 'Inspect stripe coats, repairs and passive fire protection application.']],
        roles: ['Coating inspector', 'Painting inspector', 'Blasting inspector', 'PFP inspector'] },
      vi: { name: 'Giám sát sơn phủ', title: 'Xử lý bề mặt và độ dày màng sơn, kiểm soát ở mọi điểm dừng', lead: 'Giám sát sơn, phun làm sạch và chống cháy thụ động cho nhà máy đóng tàu, nhà máy và công trình ngoài khơi.', note: 'AMPP · BGAS-CSWIP · FROSIO', alt: 'Giám sát viên trong đường ống nước biển',
        ticks: ['Nhiệt độ, độ ẩm tương đối và điểm sương', 'Độ sạch, độ nhám và nhiễm bẩn bề mặt', 'Đo màng ướt / khô, kiểm tra holiday và thi công PFP'],
        tasks: [['Xem xét quy trình', 'Xem xét quy trình sơn, bảng dữ liệu sơn và đặc tính kỹ thuật.'], ['Điều kiện môi trường', 'Kiểm tra nhiệt độ, độ ẩm tương đối và điểm sương trước và trong khi thi công.'], ['Xử lý bề mặt', 'Kiểm tra phun làm sạch, độ sạch, độ nhám và nhiễm bẩn bề mặt.'], ['Giám sát thi công', 'Giám sát tỷ lệ pha trộn, thời gian ủ và pot life.'], ['Kiểm tra màng sơn', 'Đo chiều dày màng ướt, màng khô và kiểm tra holiday.'], ['Sửa chữa và PFP', 'Kiểm tra sơn dặm mép, sửa chữa và thi công chống cháy thụ động.']],
        roles: ['Giám sát sơn phủ', 'Giám sát sơn', 'Giám sát phun làm sạch', 'Giám sát PFP'] } },
    { slug: 'ndt', img: IMG.safhp, quals: 'ASNT · AINDT · ISO 9712 Level II / III', stds: 'ISO 9712 · ASNT SNT-TC-1A · project acceptance criteria',
      en: { name: 'NDT services', title: 'Level II and Level III personnel, certificates verified', lead: 'Qualified NDT technicians and supervisors for conventional and advanced methods.', note: 'ASNT · AINDT · ISO 9712 Level II / III', alt: 'Phoenix SAF modules at port',
        ticks: ['Ultrasonic, magnetic particle, penetrant and radiographic testing', 'Phased array UT and TOFD', 'NDT coordination, reporting and records'],
        tasks: [['Ultrasonic testing', 'Conventional UT on welds and base material to project criteria.'], ['Magnetic particle and penetrant', 'Surface and near-surface examination with MT and PT.'], ['Radiographic testing', 'RT execution and film or digital image interpretation.'], ['Phased array and TOFD', 'Advanced UT where codes or clients require it.'], ['Certificate verification', 'Validity, method and sector checked before deployment.'], ['Reporting and records', 'NDT coordination, reports and traceable records.']],
        roles: ['NDT Level III', 'NDT Level II technician', 'NDT supervisor', 'PAUT / TOFD technician'] },
      vi: { name: 'Dịch vụ NDT', title: 'Nhân sự bậc II và bậc III, chứng chỉ đã xác minh', lead: 'Kỹ thuật viên và giám sát NDT có chứng chỉ cho các phương pháp truyền thống và nâng cao.', note: 'ASNT · AINDT · ISO 9712 bậc II / III', alt: 'Module dự án Phoenix SAF tại cảng',
        ticks: ['Siêu âm, từ tính, thẩm thấu và chụp ảnh phóng xạ', 'Siêu âm mảng pha (PAUT) và TOFD', 'Điều phối, báo cáo và hồ sơ NDT'],
        tasks: [['Siêu âm (UT)', 'Siêu âm mối hàn và vật liệu cơ bản theo tiêu chí dự án.'], ['Từ tính và thẩm thấu', 'Kiểm tra bề mặt và gần bề mặt bằng MT và PT.'], ['Chụp ảnh phóng xạ (RT)', 'Thực hiện RT và giải đoán phim hoặc ảnh số.'], ['Mảng pha và TOFD', 'Siêu âm nâng cao khi tiêu chuẩn hoặc khách hàng yêu cầu.'], ['Xác minh chứng chỉ', 'Kiểm tra hiệu lực, phương pháp và lĩnh vực trước khi điều động.'], ['Báo cáo và hồ sơ', 'Điều phối NDT, báo cáo và hồ sơ truy xuất được.']],
        roles: ['NDT bậc III', 'Kỹ thuật viên NDT bậc II', 'Giám sát NDT', 'Kỹ thuật viên PAUT / TOFD'] } },
    { slug: 'ei', img: IMG.safqn, quals: '', stds: '',
      en: { name: 'E&I inspection', title: 'From cable tray to loop check and handover', lead: 'Electrical, instrument and E&I QA/QC inspectors through installation, testing and commissioning.', note: 'Installation, loop checks, pre-commissioning', alt: 'Module barge leaving port', qualsT: 'Matched to client E&I competency requirements', stdsT: 'Project specifications and applicable E&I standards',
        ticks: ['Cable pulling, glanding and termination', 'Grounding, bonding and continuity', 'Loop checks, functional tests and pre-commissioning'],
        tasks: [['Electrical installation', 'Inspect electrical equipment installation against drawings and specifications.'], ['Instrument hook-up', 'Instrument installation, tubing and hook-up checks.'], ['Cables and terminations', 'Cable tray, pulling, glanding and termination.'], ['Grounding and continuity', 'Grounding, bonding and continuity verification.'], ['Loop checks and testing', 'Loop checks, functional testing and pre-commissioning.'], ['Test packs and handover', 'Compile and review test packs and handover dossiers.']],
        roles: ['Electrical inspector', 'Instrument inspector', 'E&I QA/QC inspector', 'Testing & commissioning inspector'] },
      vi: { name: 'Giám sát E&I', title: 'Từ máng cáp đến loop check và bàn giao', lead: 'Giám sát điện, đo lường và QA/QC E&I trong suốt giai đoạn lắp đặt, thử nghiệm và chạy thử.', note: 'Lắp đặt, loop check, tiền chạy thử', alt: 'Sà lan chở module rời cảng', qualsT: 'Theo yêu cầu năng lực E&I của khách hàng', stdsT: 'Đặc tính kỹ thuật dự án và tiêu chuẩn E&I áp dụng',
        ticks: ['Kéo cáp, gland cáp và đấu nối', 'Tiếp địa, liên kết đẳng thế và thông mạch', 'Loop check, thử chức năng và tiền chạy thử'],
        tasks: [['Lắp đặt điện', 'Kiểm tra lắp đặt thiết bị điện theo bản vẽ và đặc tính kỹ thuật.'], ['Hook-up thiết bị đo', 'Kiểm tra lắp đặt thiết bị đo, tubing và hook-up.'], ['Cáp và đấu nối', 'Máng cáp, kéo cáp, gland cáp và đấu nối.'], ['Tiếp địa và thông mạch', 'Kiểm tra tiếp địa, liên kết đẳng thế và thông mạch.'], ['Loop check và thử nghiệm', 'Loop check, thử chức năng và tiền chạy thử.'], ['Test pack và bàn giao', 'Lập và xem xét hồ sơ test pack và bàn giao.']],
        roles: ['Giám sát điện', 'Giám sát đo lường', 'Giám sát QA/QC E&I', 'Giám sát thử nghiệm & chạy thử'] } }
];

export interface FeaturedText { k: string; t: string; b: string; p: string; f: Pair[] }
export interface Featured { img: string; en: FeaturedText; vi: FeaturedText }

export const PROJECTS: { featured: Featured[]; refs: Record<Lang, [string, string, string, string][]> } = {
    featured: [
      { img: IMG.safhp, en: { k: 'Module fabrication', t: 'Phoenix Project – SAF biorefinery', b: 'Fabrication of process modules for a sustainable aviation fuel biorefinery, shipped from a Hai Phong yard.', p: 'Hai Phong, Viet Nam', f: [['19', 'modules']] }, vi: { k: 'Chế tạo module', t: 'Dự án Phoenix – nhà máy SAF', b: 'Chế tạo module công nghệ cho nhà máy nhiên liệu hàng không bền vững, xuất xưởng từ bãi chế tạo tại Hải Phòng.', p: 'Hải Phòng, Việt Nam', f: [['19', 'module']] } },
      { img: IMG.otsm1, en: { k: 'Module fabrication', t: 'OTSM1 Project', b: 'Heavy module fabrication and load-out at the Bulham factory in Viet Nam.', p: 'Bulham factory, Viet Nam', f: [['3,692 t', 'total weight'], ['20', 'modules']] }, vi: { k: 'Chế tạo module', t: 'Dự án OTSM1', b: 'Chế tạo và xuất xưởng module siêu trọng tại nhà máy Bulham, Việt Nam.', p: 'Nhà máy Bulham, Việt Nam', f: [['3.692 tấn', 'tổng khối lượng'], ['20', 'module']] } },
      { img: IMG.pipe, en: { k: 'Coating inspection', t: 'Seawater pipe coating – CTCI', b: 'Coating inspection inside the seawater pipeline of a thermal power plant, carried out for CTCI (Taiwan).', p: 'Van Phong 1 Thermal Power Plant, Khanh Hoa', f: [['CTCI', 'client, Taiwan']] }, vi: { k: 'Giám sát sơn phủ', t: 'Sơn phủ đường ống nước biển – CTCI', b: 'Giám sát sơn phủ bên trong đường ống nước biển của nhà máy nhiệt điện, thực hiện cho CTCI (Đài Loan).', p: 'Nhà máy Nhiệt điện Vân Phong 1, Khánh Hòa', f: [['CTCI', 'khách hàng, Đài Loan']] } },
      { img: IMG.safqn, en: { k: 'Module load-out', t: 'Phoenix Project – Quang Ngai', b: 'Module transport by barge for the Phoenix sustainable aviation fuel project.', p: 'Quang Ngai, Viet Nam', f: [['SAF', 'biorefinery']] }, vi: { k: 'Vận chuyển module', t: 'Dự án Phoenix – Quảng Ngãi', b: 'Vận chuyển module bằng sà lan cho dự án nhiên liệu hàng không bền vững Phoenix.', p: 'Quảng Ngãi, Việt Nam', f: [['SAF', 'nhà máy lọc sinh học']] } }
    ],
    refs: {
      en: [['Pengerang Biorefinery – Petronas', 'Welding, NDT, coating, E&I, insulation, structure', 'Superintendent, inspection services, NDT supervisor', 'Jan – Dec 2026'], ['Van Phong 1 Thermal Power Plant – Sumitomo / VPCL', 'Welding, NDT, mechanical installation', 'Inspection services', '2019 – 2025'], ['Cargo vessel 5,000 DWT – Handelskade', 'Coating', 'Inspection services', 'Sep 2025 – Apr 2026'], ['TPC Offshore Wind Power Generation Phase II', 'Coating', 'Inspection services', 'Jun – Aug 2025']],
      vi: [['Pengerang Biorefinery – Petronas', 'Hàn, NDT, sơn phủ, E&I, bảo ôn, kết cấu', 'Superintendent, giám sát, giám sát NDT', 'T1 – T12/2026'], ['Nhà máy Nhiệt điện Vân Phong 1 – Sumitomo / VPCL', 'Hàn, NDT, lắp đặt cơ khí', 'Dịch vụ giám sát', '2019 – 2025'], ['Tàu hàng 5.000 DWT – Handelskade', 'Sơn phủ', 'Dịch vụ giám sát', 'T9/2025 – T4/2026'], ['Điện gió ngoài khơi TPC giai đoạn II', 'Sơn phủ', 'Dịch vụ giám sát', 'T6 – T8/2025']]
    }
};

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const qualsOf = (s: Service, lang: Lang) => ({
  q: s.quals || s[lang].qualsT || "",
  s: s.stds || s[lang].stdsT || "",
});
