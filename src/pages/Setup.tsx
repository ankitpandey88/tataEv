import { useState } from 'react';
import { Upload, CheckCircle, Zap, Brain, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

type TrainingState = 'idle' | 'processing' | 'completed';

interface SetupProps {
  onBackClick: () => void;
}

export function Setup({ onBackClick }: SetupProps) {
  const [trainingState, setTrainingState] = useState<TrainingState>('idle');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadClick = () => {
    const mockImages = [
      'https://images.pexels.com/photos/159397/solar-installation-photovoltaic-solar-panels-159397.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/6962142/pexels-photo-6962142.jpeg?auto=compress&cs=tinysrgb&w=600',
    ];
    setUploadedImages(mockImages);
  };

  const handleTrainModel = async () => {
    setTrainingState('processing');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTrainingState('completed');
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 500);
  };

  const handleReset = () => {
    setTrainingState('idle');
    setProgress(0);
    setUploadedImages([]);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <button
            onClick={onBackClick}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Powered by AI</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Train intelligent models to analyze EV charging station images and optimize operations with machine learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8386369/pexels-photo-8386369.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="EV Charging Station"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
                  <p className="text-sm opacity-90">Analyze charging station efficiency</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Features</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Real-time image analysis
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Automatic station detection
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Performance optimization
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Predictive maintenance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload EV Station Images</h3>

              <div
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop Images</h4>
                  <p className="text-gray-600 mb-4">or click to select files</p>
                  <Button
                    onClick={handleUploadClick}
                    variant={uploadedImages.length > 0 ? 'secondary' : 'primary'}
                    className="text-sm"
                  >
                    {uploadedImages.length > 0 ? 'Add More Images' : 'Select Images'}
                  </Button>
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Selected Images ({uploadedImages.length})
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden shadow-md h-24"
                      >
                        <img
                          src={image}
                          alt={`Station ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Train AI Model</h3>

              {trainingState === 'idle' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    {uploadedImages.length === 0
                      ? 'Upload images first to train the model'
                      : `Ready to train with ${uploadedImages.length} images`}
                  </p>
                  <Button
                    onClick={handleTrainModel}
                    fullWidth
                    disabled={uploadedImages.length === 0}
                  >
                    Train Model
                  </Button>
                </div>
              )}

              {trainingState === 'processing' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Training in progress...</span>
                    <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 animate-pulse">
                    Processing images and training AI model...
                  </p>
                </div>
              )}

              {trainingState === 'completed' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold text-green-900 mb-2">Model Trained Successfully!</h4>
                    <p className="text-sm text-green-700 mb-4">
                      Your AI model is now ready to analyze EV station images
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-medium mb-2">Model Statistics:</p>
                    <ul className="space-y-1">
                      <li>Accuracy: 94.8%</li>
                      <li>Processing Time: 2.3s per image</li>
                      <li>Optimization Level: Advanced</li>
                    </ul>
                  </div>
                  <Button onClick={handleReset} fullWidth variant="secondary">
                    Train Another Model
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold text-xl">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload Images</h4>
              <p className="text-gray-600 text-sm">
                Drag and drop EV charging station images for analysis
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold text-xl">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Train Model</h4>
              <p className="text-gray-600 text-sm">
                AI algorithm learns from images to improve accuracy
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold text-xl">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Deploy & Analyze</h4>
              <p className="text-gray-600 text-sm">
                Use trained model for real-time station analysis
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-lg">
                <Brain className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">About This AI Module</h3>
              <p className="text-blue-100 mb-4">
                This AI module helps analyze EV charging station images and improves station efficiency using machine learning.
                By training on diverse station images, the model learns to identify key features, detect anomalies, and provide
                actionable insights for optimizing power delivery, maintenance schedules, and overall operational performance.
              </p>
              <p className="text-blue-100">
                The system uses advanced computer vision algorithms to extract meaningful patterns from images, enabling automated
                monitoring and predictive maintenance recommendations for your EV infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
