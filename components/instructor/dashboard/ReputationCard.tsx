import { calculatePercentile } from "@/utils/instructorMetrics";

interface ReputationCardProps {
    rating: number;
    totalReviews: number;
}

export function ReputationCard({ rating, totalReviews }: ReputationCardProps) {
    const percentile = calculatePercentile(rating);
    const progressWidth = (rating / 5) * 100;

    // Calculate star display
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-instructor-secondary">
                    stars
                </span>
                Reputação
            </h3>
            <div className="bg-gradient-to-br from-instructor-surface-dark to-instructor-surface-dark-2 rounded-3xl p-6 border border-white/5 shadow-xl flex flex-col flex-1 min-h-[300px]">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h4 className="text-white font-bold text-lg">Sua Avaliação</h4>
                        <p className="text-gray-400 text-sm">
                            Baseado em {totalReviews} {totalReviews === 1 ? 'avaliação' : 'avaliações'}
                        </p>
                    </div>
                    <div className="bg-instructor-secondary/10 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-instructor-secondary text-2xl">
                            trophy
                        </span>
                    </div>
                </div>
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-white">{rating.toFixed(1)}</span>
                    <div className="flex text-instructor-secondary mb-2">
                        {[...Array(fullStars)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-xl">star</span>
                        ))}
                        {hasHalfStar && (
                            <span className="material-symbols-outlined text-xl">star_half</span>
                        )}
                        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                            <span key={`empty-${i}`} className="material-symbols-outlined text-xl text-gray-600">star</span>
                        ))}
                    </div>
                </div>
                <div className="mb-6">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-instructor-secondary transition-all duration-500"
                            style={{ width: `${progressWidth}%` }}
                        ></div>
                    </div>
                    <p className="text-right text-instructor-secondary text-xs font-bold mt-1">
                        Top {percentile}% dos instrutores
                    </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 mt-auto border border-white/5">
                    <p className="text-instructor-secondary font-bold text-sm mb-1">
                        {rating >= 4.7 ? 'Prioridade Alta' : rating >= 4.3 ? 'Prioridade Média' : 'Continue melhorando'}
                    </p>
                    <p className="text-gray-400 text-sm">
                        {rating >= 4.7
                            ? 'Sua nota alta garante prioridade na busca de novos alunos premium.'
                            : 'Mantenha um bom atendimento para aumentar sua prioridade na plataforma.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
