export const VEHICLE_FEATURES = [
    "Ar Condicionado",
    "Direção Hidráulica",
    "Direção Elétrica",
    "Pedal Duplo",
    "Freio Duplo",
    "Câmbio Automático",
    "Câmera de Ré",
    "Sensor de Estacionamento", // Keeping if user wants it, but they didn't list it explicitely in the cleaned list, but "Câmera de Ré" was there. User list had "Câmera de Ré". I'll stick strictly to user list but deduplicated.
    "Ajuste de Altura do Banco",
    "Carregador USB",
    "Carregador USB-C"
];

// Deduplicated list from user request:
// Carregador USB-C
// Carregador USB
// Câmera de Ré
// Câmbio Automático
// Freio Duplo
// Ar Condicionado
// Direção Elétrica
// Direção Hidráulica
// Ar-condicionado (Duplicate)
// Ajuste de Altura do Banco
// Carregador USB (Duplicate)
// Pedal Duplo

export const VEHICLE_FEATURES_STANDARD = [
    "Ar Condicionado",
    "Direção Hidráulica",
    "Direção Elétrica",
    "Pedal Duplo",
    "Freio Duplo",
    "Câmbio Automático",
    "Câmera de Ré",
    "Ajuste de Altura do Banco",
    "Carregador USB",
    "Carregador USB-C"
];
