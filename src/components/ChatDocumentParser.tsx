import React from 'react';
import { Calculator, Beaker, Atom } from 'lucide-react';

interface ParsedElement {
  type: 'header' | 'paragraph' | 'bold' | 'formula' | 'list' | 'table' | 'calculation' | 'answer';
  content: string | ParsedElement[];
  level?: number;
  listItems?: string[];
}

interface ChatDocumentParserProps {
  content: string;
}

const ChatDocumentParser: React.FC<ChatDocumentParserProps> = ({ content }) => {
  const parseContent = (text: string): ParsedElement[] => {
    const lines = text.split('\n');
    const elements: ParsedElement[] = [];
    let currentParagraph = '';
    let inTable = false;
    let tableRows: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (!line) {
        if (currentParagraph) {
          elements.push({
            type: 'paragraph',
            content: parseInlineElements(currentParagraph.trim())
          });
          currentParagraph = '';
        }
        continue;
      }

      // Handle headers
      if (line.startsWith('##')) {
        if (currentParagraph) {
          elements.push({
            type: 'paragraph',
            content: parseInlineElements(currentParagraph.trim())
          });
          currentParagraph = '';
        }
        
        const headerLevel = line.match(/^#+/)?.[0].length || 2;
        const headerText = line.replace(/^#+\s*/, '');
        
        elements.push({
          type: 'header',
          content: parseInlineElements(headerText),
          level: headerLevel
        });
        continue;
      }

      // Handle table detection (simple pipe-separated values)
      if (line.includes('|') && !line.includes('$')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        if (cells.length > 0) {
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        // End of table
        if (tableRows.length > 0) {
          elements.push({
            type: 'table',
            content: tableRows as any
          });
        }
        inTable = false;
        tableRows = [];
      }

      // Handle answer sections
      if (line.startsWith('**Answer:**') || line.startsWith('**(a)') || line.startsWith('**(b)') || line.startsWith('**(c)')) {
        if (currentParagraph) {
          elements.push({
            type: 'paragraph',
            content: parseInlineElements(currentParagraph.trim())
          });
          currentParagraph = '';
        }
        
        elements.push({
          type: 'answer',
          content: parseInlineElements(line)
        });
        continue;
      }

      // Handle calculations (lines with = signs and numbers)
      if (line.includes('=') && /\d/.test(line) && !line.includes('$')) {
        if (currentParagraph) {
          elements.push({
            type: 'paragraph',
            content: parseInlineElements(currentParagraph.trim())
          });
          currentParagraph = '';
        }
        
        elements.push({
          type: 'calculation',
          content: line
        });
        continue;
      }

      // Add to current paragraph
      currentParagraph += (currentParagraph ? ' ' : '') + line;
    }

    // Handle remaining content
    if (inTable && tableRows.length > 0) {
      elements.push({
        type: 'table',
        content: tableRows as any
      });
    } else if (currentParagraph) {
      elements.push({
        type: 'paragraph',
        content: parseInlineElements(currentParagraph.trim())
      });
    }

    return elements;
  };

  const parseInlineElements = (text: string): ParsedElement[] => {
    const elements: ParsedElement[] = [];
    let remaining = text;

    while (remaining) {
      // Match formulas first (highest priority)
      const formulaMatch = remaining.match(/\$([^$]+)\$/);
      if (formulaMatch) {
        const beforeFormula = remaining.substring(0, formulaMatch.index!);
        if (beforeFormula) {
          elements.push(...parseTextElements(beforeFormula));
        }
        
        elements.push({
          type: 'formula',
          content: formulaMatch[1]
        });
        
        remaining = remaining.substring(formulaMatch.index! + formulaMatch[0].length);
        continue;
      }

      // No more formulas, parse remaining text
      elements.push(...parseTextElements(remaining));
      break;
    }

    return elements;
  };

  const parseTextElements = (text: string): ParsedElement[] => {
    const elements: ParsedElement[] = [];
    let remaining = text;

    while (remaining) {
      // Match bold text
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      if (boldMatch) {
        const beforeBold = remaining.substring(0, boldMatch.index!);
        if (beforeBold) {
          elements.push({
            type: 'paragraph',
            content: beforeBold
          });
        }
        
        elements.push({
          type: 'bold',
          content: boldMatch[1]
        });
        
        remaining = remaining.substring(boldMatch.index! + boldMatch[0].length);
        continue;
      }

      // No more special elements
      if (remaining) {
        elements.push({
          type: 'paragraph',
          content: remaining
        });
      }
      break;
    }

    return elements;
  };

  const renderFormula = (formula: string) => {
    // Enhanced formula rendering with better chemical notation
    let rendered = formula;
    
    // Handle subscripts (numbers and single letters)
    rendered = rendered.replace(/(_)(\d+|[a-zA-Z])/g, '<sub>$2</sub>');
    
    // Handle superscripts
    rendered = rendered.replace(/(\^)(\d+|[a-zA-Z+\-]+)/g, '<sup>$2</sup>');
    
    // Handle text wrapping for chemical names
    rendered = rendered.replace(/\\text\{([^}]+)\}/g, '$1');
    
    // Handle fractions
    rendered = rendered.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>');
    
    // Handle special chemical notation
    rendered = rendered.replace(/\\ce\{([^}]+)\}/g, '$1');
    
    // Handle special characters
    rendered = rendered.replace(/\\cdot/g, '·');
    rendered = rendered.replace(/\\times/g, '×');
    rendered = rendered.replace(/\\rightarrow/g, '→');
    rendered = rendered.replace(/\\leftarrow/g, '←');
    rendered = rendered.replace(/\\leftrightarrow/g, '↔');
    rendered = rendered.replace(/\\alpha/g, 'α');
    rendered = rendered.replace(/\\beta/g, 'β');
    rendered = rendered.replace(/\\gamma/g, 'γ');
    rendered = rendered.replace(/\\delta/g, 'δ');
    rendered = rendered.replace(/\\Delta/g, 'Δ');
    rendered = rendered.replace(/\\lambda/g, 'λ');
    rendered = rendered.replace(/\\mu/g, 'μ');
    rendered = rendered.replace(/\\pi/g, 'π');
    rendered = rendered.replace(/\\omega/g, 'ω');
    rendered = rendered.replace(/\\Omega/g, 'Ω');
    rendered = rendered.replace(/\\pm/g, '±');
    rendered = rendered.replace(/\\approx/g, '≈');
    rendered = rendered.replace(/\\equiv/g, '≡');
    rendered = rendered.replace(/\\neq/g, '≠');
    rendered = rendered.replace(/\\leq/g, '≤');
    rendered = rendered.replace(/\\geq/g, '≥');
    rendered = rendered.replace(/\\infty/g, '∞');
    
    return (
      <span 
        className="formula-inline"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    );
  };

  const renderElement = (element: ParsedElement, index: number): React.ReactNode => {
    switch (element.type) {
      case 'header':
        const HeaderTag = `h${element.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <div key={index} className="mb-6">
            <HeaderTag className="flex items-center gap-3 font-bold text-gray-800 mb-3 text-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-chemistry-blue to-blue-600 rounded-full flex items-center justify-center">
                <Atom className="w-4 h-4 text-white" />
              </div>
              {Array.isArray(element.content) 
                ? element.content.map((el, i) => renderElement(el, i))
                : element.content
              }
            </HeaderTag>
          </div>
        );
      
      case 'answer':
        return (
          <div key={index} className="chat-answer-section">
            <div className="chat-answer-content">
              <Calculator className="w-5 h-5 text-chemistry-green flex-shrink-0" />
              <div className="chat-answer-text">
              {Array.isArray(element.content) 
                ? element.content.map((el, i) => renderElement(el, i))
                : element.content as string
              }
              </div>
            </div>
          </div>
        );
      
      case 'calculation':
        return (
          <div key={index} className="chat-calculation-box">
            <div className="chat-calculation-content">
              <Beaker className="w-4 h-4 text-chemistry-purple flex-shrink-0" />
              <span className="chat-calculation-text">{element.content as string}</span>
            </div>
          </div>
        );
      
      case 'paragraph':
        if (Array.isArray(element.content)) {
          // Check for special content types
          const textContent = element.content.map(el => 
            typeof el.content === 'string' ? el.content : ''
          ).join('');
          
          // Question section
          if (textContent.includes('**Question:**')) {
            return (
              <div key={index} className="chat-question-section">
                <div className="chat-question-label">Question:</div>
                <div className="text-gray-700 leading-relaxed">
                  {element.content.map((el, i) => renderElement(el, i))}
                </div>
              </div>
            );
          }
          
          // Solution section
          if (textContent.includes('**Solution:**')) {
            return (
              <div key={index} className="mb-4">
                <h4 className="flex items-center gap-2 font-bold text-chemistry-blue text-lg mb-2">
                  <Calculator className="w-5 h-5" />
                  Solution:
                </h4>
              </div>
            );
          }
          
          // Therefore statements
          if (textContent.startsWith('Therefore,')) {
            return (
              <div key={index} className="mb-4 p-4 bg-gradient-to-r from-chemistry-green/10 to-green-100/50 border-l-4 border-chemistry-green rounded-r-lg">
                <div className="flex items-start gap-3">
                  <span className="text-chemistry-green text-xl font-bold">✓</span>
                  <div className="text-gray-700 leading-relaxed">
                    {element.content.map((el, i) => renderElement(el, i))}
                  </div>
                </div>
              </div>
            );
          }
          
          return (
            <div key={index} className="text-gray-700 mb-4 leading-relaxed">
              {element.content.map((el, i) => renderElement(el, i))}
            </div>
          );
        }
        return (
          <span key={index} className="text-gray-700">
            {element.content}
          </span>
        );
      
      case 'bold':
        return (
          <strong key={index} className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">
            {element.content as string}
          </strong>
        );
      
      case 'formula':
        return (
          <span key={index}>
            {renderFormula(element.content as string)}
          </span>
        );
      
      case 'table':
        const tableData = element.content as unknown as string[][];
        if (!tableData || tableData.length === 0) return null;
        
        return (
          <div key={index} className="chat-table-container">
            <table className="chat-table">
              <thead className="chat-table-header">
                <tr>
                  {tableData[0]?.map((header, i) => (
                    <th key={i} className="chat-table-th">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row, i) => (
                  <tr key={i} className={`chat-table-row ${i % 2 === 0 ? 'chat-table-row-even' : 'chat-table-row-odd'}`}>
                    {row.map((cell, j) => (
                      <td key={j} className="chat-table-td">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!content) {
    return <div className="text-gray-500 text-sm">No content available</div>;
  }

  const parsedElements = parseContent(content);

  return (
    <div className="chat-document-parser-content">
      {parsedElements.map((element, index) => renderElement(element, index))}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .fraction {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            margin: 0 2px;
          }
          .numerator {
            border-bottom: 1px solid currentColor;
            padding: 0 2px;
            font-size: 0.8em;
          }
          .denominator {
            padding: 0 2px;
            font-size: 0.8em;
          }
        `
      }} />
    </div>
  );
};

export default ChatDocumentParser;