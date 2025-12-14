import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { GraduationCap, Play, FileText, CheckCircle2, Lock, Award, Clock, ArrowRight } from 'lucide-react';

const Training = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, trainingModules, completeModule, trainingProgress } = useApp();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleCompleteModule = (moduleId: string) => {
    completeModule(moduleId);
    toast.success('Module completed! +50 Green Points earned');
    setActiveModule(null);
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Waste Warrior Training</h1>
                <p className="text-muted-foreground">Complete all modules to unlock your certificate</p>
              </div>
            </div>
            
            {/* Progress */}
            <Card className="mt-6">
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">Training Progress</span>
                  <Badge variant={trainingProgress === 100 ? 'default' : 'secondary'} className={trainingProgress === 100 ? 'bg-success' : ''}>
                    {trainingProgress === 100 ? 'Certified!' : `${trainingProgress}% Complete`}
                  </Badge>
                </div>
                <Progress value={trainingProgress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {trainingModules.filter(m => m.isCompleted).length} of {trainingModules.length} modules completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            {trainingModules.map((module, index) => (
              <Card key={module.id} className={module.isLocked ? 'opacity-60' : 'card-hover'}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${module.isCompleted ? 'bg-success/10' : module.isLocked ? 'bg-muted' : 'bg-primary/10'}`}>
                      {module.isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-success" />
                      ) : module.isLocked ? (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      ) : module.type === 'video' ? (
                        <Play className="h-6 w-6 text-primary" />
                      ) : (
                        <FileText className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            Module {index + 1}: {module.title}
                          </h3>
                          <p className="text-muted-foreground mt-1">{module.description}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {module.duration}
                            </Badge>
                            <Badge variant="outline" className="capitalize">{module.type}</Badge>
                          </div>
                        </div>
                        {!module.isLocked && !module.isCompleted && (
                          <Button onClick={() => handleCompleteModule(module.id)}>
                            Start
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        )}
                        {module.isCompleted && (
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certificate CTA */}
          {trainingProgress === 100 && (
            <Card className="mt-8 border-primary bg-primary/5">
              <CardContent className="py-8 text-center">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Congratulations, Waste Warrior!</h3>
                <p className="text-muted-foreground mb-4">You've completed all training modules.</p>
                <Button size="lg">Download Certificate</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Training;
