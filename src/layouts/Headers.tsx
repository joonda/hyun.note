export default function Header() {
    return (
        <nav className="flex justify-center w-full bg-gray-100 p-4">
            {/* 부모 컨테이너에 너비를 제한합니다 */}
            <div className="flex justify-between items-center max-w-[1200px] w-full">
                <div className="text-gray-800">
                    Hello
                </div>
                <div className="text-gray-800">
                    About
                </div>
            </div>
        </nav>
    )
}