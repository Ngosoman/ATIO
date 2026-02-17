import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';


function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);

    // Styles for the chatbot container
    const containerStyle = {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
        position: 'relative',
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-[380px] h-[600px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-tight">ATIO Assistant</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">
                                        Zapier Live
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                            aria-label="Close Chat"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Zapier Chatbot Widget Area */}
                    <div style={containerStyle}>
                        <zapier-interfaces-chatbot-embed
                            is-popup='false'
                            chatbot-id='cmlhwj1bw0054118b6v97i0pl'
                            style={{ height: '100%', width: '100%' }}
                        ></zapier-interfaces-chatbot-embed>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center hover:scale-105 transition-all active:scale-95 group relative overflow-hidden"
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {isOpen ? (
                    <X size={28} className="relative z-10" />
                ) : (
                    <MessageCircle size={28} className="relative z-10" />
                )}
            </button>
        </div>
    );
}

export { FloatingChat };
