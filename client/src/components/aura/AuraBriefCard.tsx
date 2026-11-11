import React, { useState } from 'react';
import { Pencil, Check, ArrowLeft, Send } from 'lucide-react';
import {
  EventProfile,
  FIELD_META,
  FieldMeta,
  MAX_FIELD_LENGTH,
  ProfileField,
  isUnset,
  stillToConfirm,
} from './auraBrief';

interface AuraBriefCardProps {
  profile: EventProfile;
  error?: string | null;
  onChange: (field: ProfileField, value: string) => void;
  onContinue: () => void;
  onPrepare: () => void;
}

const Row: React.FC<{
  meta: FieldMeta;
  value?: string;
  editing: boolean;
  onChange: (field: ProfileField, value: string) => void;
}> = ({ meta, value, editing, onChange }) => {
  const id = `aura-field-${meta.key}`;
  return (
    <div className="aura-row">
      <dt>
        <label htmlFor={editing ? id : undefined}>{meta.label}</label>
      </dt>
      <dd className={!editing && isUnset(value) ? 'is-empty' : undefined}>
        {editing ? (
          meta.multiline ? (
            <textarea
              id={id}
              className="aura-field"
              rows={2}
              maxLength={MAX_FIELD_LENGTH}
              value={value ?? ''}
              onChange={(e) => onChange(meta.key, e.target.value)}
            />
          ) : (
            <input
              id={id}
              className="aura-field"
              type="text"
              maxLength={MAX_FIELD_LENGTH}
              value={value ?? ''}
              onChange={(e) => onChange(meta.key, e.target.value)}
            />
          )
        ) : isUnset(value) ? (
          'To be confirmed'
        ) : (
          value
        )}
      </dd>
    </div>
  );
};

export const AuraBriefCard: React.FC<AuraBriefCardProps> = ({
  profile,
  error,
  onChange,
  onContinue,
  onPrepare,
}) => {
  const [editing, setEditing] = useState(false);
  const missing = stillToConfirm(profile);

  const group = (name: FieldMeta['group']) =>
    FIELD_META.filter((m) => m.group === name).map((meta) => (
      <Row key={meta.key} meta={meta} value={profile[meta.key]} editing={editing} onChange={onChange} />
    ));

  return (
    <div className="aura-sheet">
      <section className="aura-brief" aria-labelledby="aura-brief-title">
        <h3 id="aura-brief-title" className="aura-serif">
          Happy Events Enquiry
        </h3>
        <p className="aura-brief-note">
          Built only from what you have told Aura. Review it and change anything before you continue.
        </p>

        <div className="aura-group-label">Your event</div>
        <dl style={{ margin: 0 }}>{group('event')}</dl>

        <div className="aura-group-label">About you (optional)</div>
        <dl style={{ margin: 0 }}>{group('you')}</dl>

        {missing.length > 0 && (
          <>
            <div className="aura-group-label">Still to confirm</div>
            <ul className="aura-confirm-list">
              {missing.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      {error && (
        <p className="aura-inline-error" role="alert">
          {error}
        </p>
      )}

      <div className="aura-actions">
        <div className="aura-actions-row">
          <button type="button" className="aura-btn" onClick={() => setEditing((v) => !v)}>
            {editing ? <Check size={15} aria-hidden /> : <Pencil size={15} aria-hidden />}
            {editing ? 'Save Changes' : 'Edit Details'}
          </button>
          <button type="button" className="aura-btn" onClick={onContinue}>
            <ArrowLeft size={15} aria-hidden />
            Continue Planning
          </button>
        </div>
        <button type="button" className="aura-btn aura-btn--primary" onClick={onPrepare}>
          <Send size={15} aria-hidden />
          Prepare WhatsApp Message
        </button>
      </div>
    </div>
  );
};

export default AuraBriefCard;
