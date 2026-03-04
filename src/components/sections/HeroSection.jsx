export default function HeroSection() {
  return(
            <section className="flex justify-center gap-6 mt-12 ">
                {heroImages.map((item) => (
                    <HeroCard key={item.id} imageUrl={item.imageUrl} />
                ))}
            </section>
        )
}
const heroImages =[
    {id:1, imageUrl:"https://picsum.photos/400/600?1"},
    {id:2, imageUrl:"https://picsum.photos/400/600?2"},
    {id:3, imageUrl:"https://picsum.photos/400/600?3"},
    {id:4, imageUrl:"https://picsum.photos/400/600?4"}
];
function HeroCard({imageUrl}) {
    return(
        
            <div className="w-64 h-80 bg-white overflow-hidden shadow rounded hover:scale-105 transition-transform duration-300">
              
                <img 
                    src={imageUrl} 
                    className="w-full h-full object-cover">
                </img>
            </div>
            )
}