// Question Configuration Data
const QUESTIONS = [
    {
        id: 1,
        type: 'buttons',
        title: 'Was möchten Sie mit der Geldanlage für Ihr Kind erreichen?',
        subtitle: 'Ihre Anlageziele haben für uns die höchste Priorität.',
        options: [
            { id: 'preserve', label: 'Vermögen erhalten' },
            { id: 'grow', label: 'Vermögen mehren' }
        ]
    },
    {
        id: 2,
        type: 'slider',
        title: 'Welche Rendite erwarten Sie?',
        subtitle: 'Höhere Renditeerwartungen gehen meistens mit einem höheren Risiko temporärer Wertverluste einher. Bei uns stehen Ihre Erwartungen im Fokus: Wie sollte die Anlagestrategie für Ihr Kind ausgerichtet sein?',
        min: 2,
        max: 7,
        default: 5,
        labels: {
            left: 'konservativ',
            right: 'wachstumsorientiert'
        }
    },
    {
        id: 3,
        type: 'slider-duration',
        title: 'Wie lange möchten Sie das Vermögen anlegen?',
        subtitle: 'Wir verfolgen langfristige Anlagestrategien. Doch selbstverständlich können Sie jederzeit über das Kundenportal Auszahlungen vornehmen.',
        min: 3,
        max: 10,
        default: 5,
        unit: 'Jahre',
        labels: {
            left: 'mind. 3 Jahre',
            right: 'mehr als 10 Jahre'
        }
    },
    {
        id: 4,
        type: 'buttons-grid',
        title: 'What price fluctuations are acceptable to you?',
        subtitle: null,
        options: [
            { id: 'none', label: 'No' },
            { id: 'small', label: 'Small amount' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'High' }
        ]
    },
    {
        id: 5,
        type: 'buttons-grid',
        title: 'How much would you like to invest?',
        subtitle: 'After opening your account, you can make deposits and withdrawals free of charge at any time or set up a monthly investment plan.',
        options: [
            { id: '100k', label: '€100,000' },
            { id: '250k', label: '€250,000' },
            { id: '500k', label: '€500,000' },
            { id: '1m', label: '€1,000,000' }
        ],
        customAmount: true
    },
    {
        id: 6,
        type: 'buttons-grid',
        title: 'How much experience do you have with securities?',
        subtitle: null,
        options: [
            { id: 'none', label: 'None' },
            { id: 'low', label: 'Low' },
            { id: 'medium', label: 'Medium' },
            { id: 'extensive', label: 'Extensive' }
        ]
    },
    {
        id: 7,
        type: 'buttons-grid',
        title: 'How much can you invest monthly?',
        subtitle: null,
        options: [
            { id: 'lt500', label: '< €500' },
            { id: '500-1000', label: '€500 - €1,000' },
            { id: '1000-2500', label: '€1,000 - €2,500' },
            { id: 'gt2500', label: '> €2,500' }
        ]
    },
    {
        id: 8,
        type: 'buttons-grid',
        title: 'What age group are you in?',
        subtitle: null,
        options: [
            { id: 'lt30', label: '< 30' },
            { id: '30-45', label: '30 - 45' },
            { id: '45-60', label: '45 - 60' },
            { id: 'gt60', label: '> 60' }
        ]
    },
    {
        id: 9,
        type: 'buttons-grid',
        title: 'What would you like to invest for?',
        subtitle: null,
        options: [
            { id: 'retirement', label: 'Retirement' },
            { id: 'wealth', label: 'Wealth building' },
            { id: 'purchase', label: 'Save for purchase' },
            { id: 'other', label: 'Other' }
        ]
    },
    {
        id: 10,
        type: 'buttons',
        title: 'Do you already have securities investments?',
        subtitle: null,
        options: [
            { id: 'no', label: 'No' },
            { id: 'lt50k', label: 'Yes, under €50,000' },
            { id: 'gt50k', label: 'Yes, over €50,000' }
        ]
    },
    {
        id: 11,
        type: 'buttons',
        title: 'Do you need short-term access to your capital?',
        subtitle: null,
        options: [
            { id: 'within1y', label: 'Yes, within 1 year' },
            { id: '1-3y', label: 'Maybe in 1-3 years' },
            { id: 'no3y', label: 'No, not in the next 3 years' }
        ]
    },
    {
        id: 12,
        type: 'buttons-grid',
        title: 'Is sustainability important to you in your investment?',
        subtitle: null,
        options: [
            { id: 'very', label: 'Very important' },
            { id: 'important', label: 'Important' },
            { id: 'less', label: 'Less important' },
            { id: 'not', label: 'Unimportant' }
        ]
    },
    {
        id: 13,
        type: 'beneficiary',
        title: 'Für wen möchten Sie Geld anlegen?',
        subtitle: 'Ermitteln Sie in weniger als vier Minuten Ihre individuelle Anlagestrategie. Für Ihr kostenloses und unverbindliches Anlegerprofil benötigen Sie lediglich Ihre E-Mail-Adresse.',
        options: [
            { id: 'self', label: 'Für mich' },
            { id: 'child', label: 'Für ein Kind' },
            { id: 'company', label: 'Für eine Gesellschaft' }
        ],
        followUp: {
            title: 'Haben Sie das alleinige Sorgerecht oder gibt es weitere gesetzliche Vertreter?',
            type: 'radio',
            options: [
                { id: 'sole', label: 'Ich habe das alleinige Sorgerecht' },
                { id: 'shared', label: 'Ich teile mir das Sorgerecht mit einem weiteren gesetzlichen Vertreter' }
            ]
        },
        customerLink: 'Sie sind bereits Kunde?'
    },
    {
        id: 14,
        type: 'registration',
        title: 'Fast geschafft!',
        subtitle: 'Ihre persönliche Anlagestrategie erhalten',
        fields: [
            { name: 'firstName', label: 'Vorname', type: 'text', required: true },
            { name: 'lastName', label: 'Nachname', type: 'text', required: true },
            { name: 'email', label: 'E-Mail-Adresse', type: 'email', required: true }
        ],
        privacyText: 'Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.',
        submitText: 'Jetzt anfordern'
    }
];
