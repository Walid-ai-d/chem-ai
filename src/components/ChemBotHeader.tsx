import { FlaskConical } from 'lucide-react';

const ChemBotHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
        <FlaskConical className="w-4 h-4 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-foreground">ChemBot</h1>
        <p className="text-xs text-muted-foreground">Chemistry AI Assistant</p>
      </div>
    </div>
  );
};

export default ChemBotHeader;