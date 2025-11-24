import React, { useState } from 'react';
import { Camera, ChevronLeft, Sparkles, Check, Upload } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { generateListingDescription } from '../services/geminiService';

interface PostItemProps {
  onBack: () => void;
  onSuccess: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    price: '',
    location: '',
    description: '',
    features: '',
    images: [] as string[]
  });

  const handleAIHelp = async () => {
    if (!formData.title || !formData.category) return;
    setLoadingAI(true);
    try {
      const desc = await generateListingDescription(
        formData.title, 
        formData.category, 
        formData.features || 'Standard condition'
      );
      if (desc) setFormData(prev => ({ ...prev, description: desc }));
    } catch (e) {
      alert("Please set your API_KEY to use AI features.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate upload
    if (e.target.files && e.target.files[0]) {
       // Create fake URL
       const url = URL.createObjectURL(e.target.files[0]);
       setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  const renderStep1_Category = () => (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Choose a Category</h2>
      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setFormData({ ...formData, category: cat.id });
              setStep(2);
            }}
            className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
              formData.category === cat.id 
              ? 'border-ethio-green bg-green-50 dark:bg-green-900/20 dark:border-ethio-green' 
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {/* Simple icon mapping based on name just for demo visuals */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
               formData.category === cat.id ? 'bg-ethio-green text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}>
               <div className="w-6 h-6 bg-current rounded-sm opacity-50" /> 
            </div>
            <span className="font-medium dark:text-white">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2_Details = () => (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-bold mb-2 dark:text-white">Item Details</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input 
          type="text" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-ethio-green outline-none"
          placeholder="e.g. Toyota Vitz 2020"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (ETB)</label>
          <input 
            type="number" 
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-ethio-green outline-none"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
          <select 
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-ethio-green outline-none"
          >
            <option value="">Select City</option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Dire Dawa">Dire Dawa</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Key Features (comma separated)</label>
        <input 
          type="text" 
          value={formData.features}
          onChange={e => setFormData({...formData, features: e.target.value})}
          className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-ethio-green outline-none"
          placeholder="e.g. Red, Used, 64GB"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <button 
                onClick={handleAIHelp}
                disabled={loadingAI || !formData.title}
                className="text-xs flex items-center gap-1 text-ethio-green hover:underline disabled:opacity-50"
            >
                <Sparkles size={12} /> {loadingAI ? 'Generating...' : 'Auto-Write with AI'}
            </button>
        </div>
        <textarea 
          rows={4}
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-ethio-green outline-none"
          placeholder="Describe your item..."
        />
      </div>

      <button 
        onClick={() => setStep(3)}
        className="w-full bg-black dark:bg-white dark:text-black text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors"
      >
        Next Step
      </button>
    </div>
  );

  const renderStep3_Photos = () => (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-bold mb-2 dark:text-white">Add Photos</h2>
        
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50">
            <Upload size={40} className="text-gray-400 mb-4" />
            <p className="text-sm text-gray-500 mb-4">Drag and drop or tap to upload</p>
            <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-ethio-green file:text-white
                hover:file:bg-green-700
                "
            />
        </div>

        <div className="grid grid-cols-3 gap-2">
            {formData.images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden relative">
                    <img src={img} alt="upload" className="w-full h-full object-cover" />
                </div>
            ))}
        </div>

        <button 
            onClick={onSuccess}
            className="w-full bg-ethio-green text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
            <Check size={20} /> Post Listing
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-4">
        <button onClick={() => step > 1 ? setStep(step - 1) : onBack()} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold dark:text-white">New Listing</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-ethio-green' : 'bg-gray-200 dark:bg-gray-700'}`} />
            ))}
        </div>

        {step === 1 && renderStep1_Category()}
        {step === 2 && renderStep2_Details()}
        {step === 3 && renderStep3_Photos()}
      </div>
    </div>
  );
};

export default PostItem;
